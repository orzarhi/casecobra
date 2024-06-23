'use client'

import { CaseColor } from "@prisma/client";

interface PhonePreviewProps {
    croppedImageUrl: string;
    color: CaseColor;
}

export const PhonePreview = ({ croppedImageUrl, color }: PhonePreviewProps) => {
    return (
        <div>PhonePreview</div>
    )
}
