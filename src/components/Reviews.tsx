'use client'

import React, { useRef } from 'react'
import { MaxWidthWrapper } from './MaxWidthWrapper'
import Image from 'next/image'

const ReviewGrid = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    return (
        <div ref={containerRef} className='relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3'></div>
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
