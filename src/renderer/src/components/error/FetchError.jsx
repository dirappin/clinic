import React from 'react'
import { cn } from '../../util/cn'
import { TbFaceIdError } from 'react-icons/tb'

const FetchError = ({ description, action, loading, wrapperClass }) => {
    return (
        <div className={cn('w-full  p-4 text-center bg-gray-300 rounded-lg', wrapperClass)}>
            <div className="w-full flex justify-center py-4 items-center">
                <TbFaceIdError className='text-4xl' />
            </div>

            <p className='text-gray-700 text-sm mb-3'>{description}</p>
            <button onClick={() => action()} disabled={loading} type='submit' className='bg-gray-700 active:bg-gray-600 px-5 py-2 rounded-md text-white'>
                {loading && '...loading'}
                {!loading && "Re-try"}
            </button>
        </div>
    )
}

export default FetchError