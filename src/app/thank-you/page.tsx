import React, { Suspense } from 'react'
import { ThankYou } from './ThankYou'

export default function Page() {
    return (
        <Suspense>
            <ThankYou />
        </Suspense>
    )
}
