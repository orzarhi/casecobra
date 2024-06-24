import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react'

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    awaiting_shipment: 'Awaiting Shipment',
    fulfilled: 'Fulfilled',
    shipped: 'Shipped',
}

interface StatusDropDownProps {
    id: string;
    orderStatus: OrderStatus;
}

export const StatusDropDown = ({ id, orderStatus }: StatusDropDownProps) => {

    const { } = useMutation({
        mutationKey: ['change-order-status'],
        mutationFn: async () => { }
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='w-52 flex justify-between items-center'>
                    {LABEL_MAP[orderStatus]}
                    <ChevronsUpDown className='size-4 ml-2 shrink-0 opacity-50' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                {Object.keys(OrderStatus).map((status) => (
                    <DropdownMenuItem key={status} className={cn('flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100', {
                        'bg-zinc-100': orderStatus === status,
                    })}>
                        <Check className={cn('mr-2 size-4 text-primary', orderStatus === status ? 'opacity-100' : 'opacity-0')} />
                        {LABEL_MAP[status as OrderStatus]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
