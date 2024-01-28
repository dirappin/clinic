import React from 'react'
import { FiEye } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { formatDate } from '../../util/formatDate';
import MedicalRecodTriageModal from '../../components/Modals/MedicalRecodTriageModal';


const TriageRecordElement = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      key={data._id}
      className="bg-dry items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-border p-6"
    >
      {
        // Modal
        isOpen && (
          <MedicalRecodTriageModal
            closeModal={() => {
              setIsOpen(false);
              setDatas({});
            }}
            isOpen={isOpen}
            datas={{}}
          />
        )
      }
      <div className="col-span-12 md:col-span-2">
        <p className="text-xs text-textGray font-medium">{formatDate(data.createdAt)}</p>
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
        <p className='mt-1'>
          <span className="text-gray-800">Doctor: </span>{' '}
          <span className='text-sm text-gray-600'>{data.doctor.firstName + ' ' + data.doctor.secondName}</span>
        </p>

        <p className='mt-1 text-gray-800'>
          <span className="">Plaintes: </span>{' '}
          <span className='text-sm text-gray-600'>{data.complains}</span>
        </p>

        <p className='mt-1 text-gray-800'>
          <span className="">Poid: </span>{' '}
          <span className='text-sm text-gray-600'>{data.poid}</span>
        </p>


        <p className='mt-1 text-gray-800'>
          <span className="">TA: </span>{' '}
          <span className='text-sm text-gray-600'>{data.TA}</span>
        </p>

        <p className='mt-1 text-gray-800'>
          <span className="">PU: </span>{' '}
          <span className='text-sm text-gray-600'>{data.PU}</span>
        </p>

        <p className='mt-1 text-gray-800'>
          <span className="">Temperature: </span>{' '}
          <span className='text-sm text-gray-600'>{data.Temperature}</span>
        </p>

        <p className='mt-1 text-gray-800'>
          <span className="">saturometre: </span>{' '}
          <span className='text-sm text-gray-600'>{data.saturometre}</span>
        </p>

        <p className='mt-1 text-gray-800'>
          <span className="">saturometre: </span>{' '}
          <span className='text-sm text-gray-600'>{data.saturometre}</span>
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