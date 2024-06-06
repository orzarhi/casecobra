'use client'

import { cn } from "@/lib/utils"
import { useState } from "react"
import Dropzone, { FileRejection } from "react-dropzone"

export default function page() {
    const [isDragOver, setIsDragOver] = useState<boolean>(false)

    const onDropRejected = (files: FileRejection[]) => {
        console.log(files)
    }

    const onDropAccepted = (files: File[]) => {
        console.log(files)
    }

    return (
        <div className={cn('relative h-full flex-1 my-16 w-full rounded-xl bg-green-900/5 p-2 ring-inset ring-gray-900/10 lg:rounded-2xl flex  justify-center flex-col items-center', {
            'ring-blue-900/25 bg-blue-900/10': isDragOver
        })}>
            <div className="relative flex flex-1 flex-col items-center justify-center w-full">
                <Dropzone
                    onDropRejected={onDropRejected}
                    onDropAccepted={onDropAccepted}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg'],
                        'image/jpg': ['.jpg'],
                    }}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="size-full flex-1 flex flex-col items-center justify-center" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="text-lg text-gray-900">Drag & Drop your files here</p>
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    )
}
