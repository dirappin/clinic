import React from 'react'
import { LuImageOff } from 'react-icons/lu'

const NoAttachement = () => {
    return (
        <div className="flex col-span-9 m-auto w-full justify-center items-center flex-col gap-2">
            <p className="text-gray-700">No attachement</p>
            <LuImageOff className="text-gray-700 text-6xl" />
        </div>
    )
}

export default NoAttachement