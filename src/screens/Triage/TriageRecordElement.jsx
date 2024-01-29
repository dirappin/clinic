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
            data={{ ...data }}
          />
        )
      }
      <div className="col-span-12 md:col-span-2">
        <p className="text-xs text-textGray font-medium">{formatDate(data.createdAt)}</p>
      </div>
      <div className="col-span-12 md:col-span-6 text-sm flex flex-col gap-2">
        <p className='mt-1 text-xs text-main font-light'>
          <span className="font-medium">Doctor: </span>{' '}
          {data.doctor.firstName + ' ' + data.doctor.secondName}
        </p>

        <p className='mt-1 text-xs text-main font-light  '>
          <span className="font-medium">Plaintes: </span>{' '}
          {data.complains}
        </p>

        <p className='mt-1 text-xs text-main font-light '>
          <span className="font-medium">Poid: </span>{' '}
          {data.poid}
        </p>


        <p className='mt-1 text-xs text-main font-light'>
          <span className="font-medium">TA: </span>{' '}
          {data.TA}
        </p>

        <p className='mt-1 text-xs text-main font-light'>
          <span className="font-medium">PU: </span>{' '}
          {data.PU}
        </p>

        <p className='mt-1 text-xs text-main font-light'>
          <span className="font-medium">Temperature: </span>{' '}
          {data.Temperature}
        </p>

        <p className='mt-1 text-xs text-main font-light'>
          <span className="font-medium">saturometre: </span>{' '}
          {data.saturometre}
        </p>

        <p className='mt-1 text-xs text-main font-light'>
          <span className="font-medium">saturometre: </span>{' '}
          <span className='text-sm '>{data.saturometre}</span>
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