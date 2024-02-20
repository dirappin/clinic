import React from 'react'
import { formatDate } from '../../util/formatDate';
import MedicalLoboratoireRecodModal from '../../components/Modals/MedicalLoboratoireRecodModal';
import { FiEye } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useState } from 'react';
import AxiosInstancence from '../../ axiosInstance';
import DeleteModal from '../../components/Modals/DeleteModal';


const LaboratoryElement = ({ data,mutate }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const changeRecord = async () => {
        setLoading(true)
        try {
            await AxiosInstancence.delete(`radiographie/${data._id}`);
            setLoading(false)
            mutate();
            setOpenDeleteModal(false);
        } catch (error) {
            setLoading(false)
            toast.error('Failed to delete the record');
        }
    }

    return (
        <>

            {
                // Modal
                isOpen && (
                    <MedicalLoboratoireRecodModal
                        closeModal={() => {
                            setIsOpen(false);
                            setDatas({});
                        }}
                        isOpen={isOpen}
                        data={data}
                    />
                )
            }
            <div
                key={data._id}
                className="bg-dry items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-border p-6"
            >
                <div className="col-span-12 md:col-span-2">
                    <p className="text-xs text-textGray font-medium">{formatDate(data.createdAt)}</p>
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
                    <p className="text-xs text-main font-light">
                        <span className="font-medium">doctor:</span>{' '}
                        {data.doctorId.forstName} {data.doctorId.secondName}
                    </p>

                    <p className="text-xs text-main font-light">
                        <span className="font-medium">Resulta:</span>{' '}
                        {data.result}
                    </p>

                    <p className="text-xs text-main font-light">
                        <span className="font-medium">Description:</span>{' '}
                        {data.examenDescription}
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
                            setIsOpen(true);
                            setDatas(data);
                        }}
                        className="text-sm flex-colo bg-white text-subMain border border-border rounded-md w-2/4 md:w-10 h-10"
                    >
                        <FiEye />
                    </button>
                    <button
                        onClick={() => {
                            setOpenDeleteModal(true);
                        }}
                        className="text-sm flex-colo bg-white text-red-600 border border-border rounded-md w-2/4 md:w-10 h-10"
                    >
                        <RiDeleteBin6Line />
                    </button>
                </div>
            </div>
            {
                openDeleteModal &&
                <DeleteModal
                    action={async () => await changeRecord()}
                    loading={loading}
                    isOpen={openDeleteModal}
                    close={() => setOpenDeleteModal(false)} />
            }
        </>
    )
}

export default LaboratoryElement