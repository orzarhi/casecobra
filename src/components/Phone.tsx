import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { HTMLAttributes } from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string
    dark?: boolean
}

export const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
    return (
        <div className={cn('relative pointer-events-none z-50 overflow-hidden', className)}{...props}>
            <Image
                className='pointer-events-none z-50 select-none'
                src={dark ? '/phone-template-dark-edges.png' : '/phone-template-white-edges.png'}

                alt='phone image'
                width={400}
                height={400}
            />
            <div className='absolute -z-10 inset-0'>
                <Image
                    className='object-cover'
                    src={imgSrc}
                    alt='overlaying phone image'
                    width={400}
                    height={400}
                />
            </div>
        </div>
    )
}
