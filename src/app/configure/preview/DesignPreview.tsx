'use client'

import { Phone } from '@/components/Phone'
import { Configuration } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'

interface DesignPreviewProps {
    configuration: Configuration
}

export const DesignPreview = ({ configuration }: DesignPreviewProps) => {
    const [showConfetti, setShowConfetti] = useState<boolean>(false)

    useEffect(() => { setShowConfetti(true) }, [])

    return (
        <>
            <div aria-hidden='true' className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
                <Confetti
                    active={showConfetti}
                    config={{
                        elementCount: 200,
                        spread: 360,
                    }}
                />
            </div>

            <div className='mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
                <div className='sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2'>
                    <Phone
                        imgSrc={configuration.croppedImageUrl!}
                    />
                </div>
            </div>
        </>
    )
}
