'use client'

import React, { CSSProperties, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Phone } from './Phone'

const PHONES = [
    '/testimonials/1.jpg',
    '/testimonials/2.jpg',
    '/testimonials/3.jpg',
    '/testimonials/4.jpg',
    '/testimonials/5.jpg',
    '/testimonials/6.jpg',
]

function splitArray<T>(array: Array<T>, numParts: number) {
    const result: Array<Array<T>> = []

    for (let i = 0; i < array.length; i++) {
        const index = i % numParts

        if (!result[index]) {
            result[index] = []
        }

        result[index].push(array[i])
    }
    return result
}


const ReviewColumn = ({
    reviews,
    className,
    reviewClassName,
    msPerPixel = 0
}: {
    reviews: string[],
    className?: string,
    reviewClassName?: (reviewIndex: number) => string,
    msPerPixel?: number
}) => {
    const columnRef = useRef<HTMLDivElement | null>(null)
    const [columnHeight, setColumnHeight] = useState<number>(0)
    const duration = `${columnHeight * msPerPixel}ms`

    useEffect(() => {
        if (!columnRef.current) return

        const resizeObserver = new window.ResizeObserver(() => {
            setColumnHeight(columnRef.current?.offsetHeight ?? 0)
        })

        resizeObserver.observe(columnRef.current)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])


    return (
        <div
            ref={columnRef}
            className={cn('animate-marquee space-y-8 py-4', className)}
            style={{ '--marquee-duration': duration } as CSSProperties}
        >
            {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
                <Review
                    key={reviewIndex}
                    className={reviewClassName?.(reviewIndex % reviews.length)}
                    imgSrc={imgSrc}
                />
            ))}
        </div>
    )
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string
}

const Review = ({ imgSrc, className, ...props }: ReviewProps) => {
    const POSSIBLE_ANIMATION_DELAYS = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']

    const animationDelay = POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)]

    return (
        <div
            className={cn('animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5', className)}
            {...props}
            style={{ animationDelay }}
        >
            <Phone imgSrc={imgSrc} />
        </div>
    )
}

const ReviewGrid = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.4 })
    const columns = splitArray(PHONES, 3)

    const columns1 = columns[0]
    const columns2 = columns[1]
    const columns3 = splitArray(columns[2], 2)

    return (
        <div ref={containerRef} className='relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3'>
            {isInView ? (
                <>
                    <ReviewColumn
                        reviews={[...columns1, ...columns3.flat(), ...columns2]}
                    />
                </>
            ) : null}
        </div>
    )
}

export const Reviews = () => {
    return (
        <MaxWidthWrapper className='relative max-w-5xl'>
            <Image
                className='absolute select-none hidden xl:block -left-32 top-1/3'
                aria-hidden='true'
                src='/what-people-are-buying.png'
                alt='What people are buying'
                width={200}
                height={200}
            />
            <ReviewGrid />
        </MaxWidthWrapper>
    )
}