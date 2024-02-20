import React, { useState } from 'react'
import { FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { formatDate } from '../../util/formatDate';
import DeleteModal from '../Modals/DeleteModal';
import MedicalRadiographiRecodModal from '../Modals/MedicalRadiographiRecodModal';
import AxiosInstancence from '../../axiosInstance';
import toast from 'react-hot-toast';


const RadioExamRecordElement = ({ data, url, mutate }) => {
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const deleteRecord = async () => {
        setLoading(true)
        try {
            await AxiosInstancence.delete(`${url}/${data._id}`);
            setLoading(false)
            mutate();
            setOpenDeleteModal(false);
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error('Failed to delete the record');
        }
    }

    return (
        <div
            key={data._id}
            className="bg-dry items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-border p-6"
        >
            <div className="col-span-12 md:col-span-2">
                <p className="text-xs text-textGray font-medium">{formatDate(data.createdAt)}</p>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">

                <p className="text-xs text-main font-light">
                    <span className="font-medium">Doctor:</span>{' '}
                    {data.doctor.firstName} {data.doctor.secondName}
                </p>

                <p className="text-xs text-main font-light">
                    <span className="font-medium">Doctor:</span>{' '}
                    {data.doctor.firstName} {data.doctor.secondName}
                </p>


                <p className="text-xs text-main font-light">
                    <span className="font-medium">Description:</span>{' '}
                    {data.description}
                </p>

                <p className="text-xs text-main font-light">
                    <span className="font-medium">result:</span>{' '}
                    {data.result}
                </p>

                <p className="text-xs text-main font-light">
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
                        setOpenDeleteModal(true)
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

            {
                openDeleteModal &&
                <DeleteModal
                    action={async () => await deleteRecord()}
                    loading={loading}
                    isOpen={openDeleteModal}
                    close={() => setOpenDeleteModal(false)} />
            }
        </div>
    )
}

export default RadioExamRecordElement