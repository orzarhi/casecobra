import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { OrderReceivedEmail } from "@/components/emails/OrderReceivedEmail";

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.text();
        const signature = req.headers.get('stripe-signature');

        if (!signature) {
            return new Response('Invalid signature', { status: 400 });
        }

        const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

        if (event.type === 'checkout.session.completed') {
            if (!event.data.object.customer_details?.email) {
                throw new Error('Missing user email');
            }
            const session = event.data.object as Stripe.Checkout.Session;

            const { userId, orderId } = session.metadata || {
                userId: null,
                orderId: null
            }

            if (!userId || !orderId) {
                throw new Error('Invalid request metadata');
            }

            const billingAddress = session.customer_details?.address;
            const shippingAddress = session.shipping_details?.address;

            const updatedOrder = await db.order.update({
                where: { id: orderId },
                data: {
                    isPaid: true,
                    shippingAddress: {
                        create: {
                            name: session.customer_details?.name as string,
                            city: shippingAddress?.city as string,
                            country: shippingAddress?.country as string,
                            postalCode: shippingAddress?.postal_code as string,
                            street: shippingAddress?.line1 as string,
                            state: shippingAddress?.state as string
                        }
                    },
                    billingAddress: {
                        create: {
                            name: session.customer_details?.name as string,
                            city: billingAddress?.city as string,
                            country: billingAddress?.country as string,
                            postalCode: billingAddress?.postal_code as string,
                            street: billingAddress?.line1 as string,
                            state: billingAddress?.state as string
                        }
                    }
                }
            })

            await resend.emails.send({
                from: 'CaseCobra <or.zarhi11@gmail.com>',
                to: [event.data.object.customer_details.email],
                subject: 'Thanks for your order!',
                react: OrderReceivedEmail({
                    orderId,
                    orderDate: updatedOrder.createdAt.toLocaleDateString(),
                    //@ts-expect-error
                    shippingAddress: {
                        name: session.customer_details?.name as string,
                        city: shippingAddress?.city as string,
                        country: shippingAddress?.country as string,
                        postalCode: shippingAddress?.postal_code as string,
                        street: shippingAddress?.line1 as string,
                        state: shippingAddress?.state as string
                    }
                })
            })
        }

        return NextResponse.json({ result: event, ok: true })
    } catch (error) {
        console.error(error)

        return NextResponse.json({ message: 'Something went wrong', ok: false }, { status: 500 })
    }
}