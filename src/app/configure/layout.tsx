import { MaxWidthWrapper, Steps } from '@/components'
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode

}

export default function layout({ children }: LayoutProps) {
    return (
        <MaxWidthWrapper className='flex-1 flex flex-col'>
            <Steps />
            {children}
        </MaxWidthWrapper>
    )
}
