import type { Dispatch, SetStateAction } from 'react'
import { Dialog } from './ui/dialog'

interface LoginModalProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>

}

export const LoginModal = ({ isOpen, setIsOpen }: LoginModalProps) => {
    return (
        <Dialog

        >

        </Dialog>
    )
}
