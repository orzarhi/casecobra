'use client'

import type { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import Image from 'next/image'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { buttonVariants } from './ui/button'

interface LoginModalProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>

}

export const LoginModal = ({ isOpen, setIsOpen }: LoginModalProps) => {
    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogContent className=''>
                <DialogHeader>
                    <div className='relative mx-auto size-24 mb-2'>
                        <Image
                            src='/snake-1.png'
                            alt='snake-image'
                            fill
                        />
                    </div>
                    <DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-900'>
                        Sign in to continue
                    </DialogTitle>
                    <DialogDescription className='text-base text-center py-2'>
                        <span className='font-medium text-zinc-900'>
                            Your configuration was saved!
                        </span>{' '}
                        Please sign in or create an account to complete your purchase.
                    </DialogDescription>
                </DialogHeader>

                <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
                    <LoginLink className={buttonVariants({ variant: 'outline' })}>Sign in</LoginLink>
                    <RegisterLink className={buttonVariants({ variant: 'default' })}>Create account</RegisterLink>
                </div>
            </DialogContent>
        </Dialog>
    )
}
