import React, { useState } from 'react'
import { FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { formatDate } from '../../util/formatDate';
import { date } from 'yup';
import MedicalRadiographiRecodModal from '../Modals/MedicalRadiographiRecodModal';


const RadioExamRecordElement = ({ data }) => {
   const [openDetailModal, setOpenDetailModal] = useState(false);

   console.log(data);

    return (
        <div
            key={data._id}
            className="bg-dry items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-border p-6"
        >
            <div className="col-span-12 md:col-span-2">
                <p className="text-xs text-textGray font-medium">{formatDate(data.createdAt)}</p>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">

                <p  className="text-xs text-main font-light">
                    <span className="font-medium">Doctor:</span>{' '}
                    {data.doctor.firstName} {data.doctor.secondName}
                </p>

                <p  className="text-xs text-main font-light">
                    <span className="font-medium">Doctor:</span>{' '}
                    {data.doctor.firstName} {data.doctor.secondName}
                </p>


                <p  className="text-xs text-main font-light">
                    <span className="font-medium">Description:</span>{' '}
                    {data.description}
                </p>

                <p  className="text-xs text-main font-light">
                    <span className="font-medium">result:</span>{' '}
                    {data.result}
                </p>

                <p  className="text-xs text-main font-light">
                    <span className="font-medium">diagnosis:</span>{' '}
                    {data.diagnosis}
                </p>
            </div>

            {/* actions */}
            <div className="col-span-12 md:col-span-2 flex-rows gap-2">
                <button
                    onClick={() => {
                        setOpenDetailModal(true);
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
            {
                // Modal
                openDetailModal && (
                    <MedicalRadiographiRecodModal
                        closeModal={() => {
                            setOpenDetailModal(false);
                        }}
                        isOpen={openDetailModal}
                        data={data}
                    />
                )
            }
        </div>
    )
}

export default RadioExamRecordElement