'use client'

import { CaseColor } from "@prisma/client";
import { useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
                <Image
                    src={croppedImageUrl}
                    className={cn("phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]", caseBackgroundColor)}
                    width={renderedDimensions.width / (3000 / 637)}
                    fill
                    alt="phone-preview"
                />
            </div>
            <div className="relative size-full z-40">
                <Image
                    src='/clearphone.png'
                    className="pointer-events-none size-full antialiased rounded-md"
                    alt="phone"
                    fill
                />
            </div>
        </AspectRatio>
    )
}
