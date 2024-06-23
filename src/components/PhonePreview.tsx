'use client'

import { cn } from "@/lib/utils";
import { CaseColor } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

interface PhonePreviewProps {
    croppedImageUrl: string;
    color: CaseColor;
}

export const PhonePreview = ({ croppedImageUrl, color }: PhonePreviewProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const [renderedDimensions, setRenderedDimensions] = useState({
        width: 0,
        height: 0,
    })

    let caseBackgroundColor = 'bg-zinc-950'
    if (color === 'blue') caseBackgroundColor = 'bg-blue-950'
    if (color === 'rose') caseBackgroundColor = 'bg-rose-950'


    const handleResize = () => {
        if (!ref.current) return;

        const { width, height } = ref.current.getBoundingClientRect()

        setRenderedDimensions({ width, height })
    }

    useEffect(() => {
        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [ref.current])


    return (
        <AspectRatio
            ref={ref}
            ratio={3000 / 2001}
            className="relative"
        >
            <div
                className="absolute z-20 scale-[1.0352]"
                style={{
                    left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
                    top: renderedDimensions.height / 6.22,
                }}
            >
                <img
                    src={croppedImageUrl}
                    className={cn("phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]", caseBackgroundColor)}
                    width={renderedDimensions.width / (3000 / 637)}
                    alt="phone-preview"
                />
            </div>
            <div className="relative size-full z-40">
                <img
                    src='/clearphone.png'
                    className="pointer-events-none size-full antialiased rounded-md"
                    alt="phone"
                />
            </div>
        </AspectRatio>
    )
}
