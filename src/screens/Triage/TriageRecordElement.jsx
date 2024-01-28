import React from 'react'
import { FiEye } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';

const TriageRecordElement = ({ data }) => {
  console.log(data)
  return (
    <div
      key={data._id}
      className="bg-dry items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-border p-6"
    >
      <div className="col-span-12 md:col-span-2">
        <p className="text-xs text-textGray font-medium">{data.date}</p>
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
        <p className='mt-1'>
          <span className="text-medium font-medium text-gray-800">Doctor:</span>{' '}
          <span className='text-sm text-gray-600'>{data.doctor.firstName + ' ' + data.doctor.secondName}</span>
        </p>

        <p className='mt-1 text-gray-800'>
          <span className="font-medium">Complains:</span>{' '}
          <span className='text-sm text-gray-600'>{data.complains}</span>
        </p>

        <p className='mt-1 text-gray-800'>
          <span className="font-medium">Vital Sign:</span>{' '}
          <span className='text-sm text-gray-600'>{data.vitalsigns}</span>
        </p>

      </div>



      <div className="col-span-12 md:col-span-2 flex-rows gap-2">
        <button
          onClick={() => {
            setIsOpen(true);
            setDatas(data);
          }}
          className="text-sm flex-colo bg-white text-subMain border border-border rounded-md w-2/4 md:w-10 h-10"
        >
          <FiEye />
        </button>
        <button
          onClick={() => {
            toast.error('This feature is not available yet');
          }}
          className="text-sm flex-colo bg-white text-red-600 border border-border rounded-md w-2/4 md:w-10 h-10"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  )
}

export default TriageRecordElement