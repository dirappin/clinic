import React from 'react'
import { FaRegFaceGrimace } from "react-icons/fa6";

const CardStatusFetchError = () => {
    return (
        <div className='w-fulll flex-col justify-center items-center mx-auto h-32 flex'>
            <FaRegFaceGrimace className='text-4xl text-gray-700' />
            <h3 className='mt-3 text-gray-800'>Failed to load status</h3>
            <h1 className='text-3xl text-red-400 italic'>500</h1>
        </div>
    )
}

export default CardStatusFetchError