import React from "react";
import MedicalRecodExamenModal from "../../components/Modals/MedicalRecodExamenModal";
import { FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../util/formatDate";
import AxiosInstancence from "../../ axiosInstance";
import { useState } from "react";
import DeleteModal from "../../components/Modals/DeleteModal";


const ExamElement = ({ data,mutate }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteRecord = async () => {
        setLoading(true)
        try {
            await AxiosInstancence.delete(`exams/${data._id}`);
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
                    <MedicalRecodExamenModal
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
                className="bg-dry items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-border p-6"
            >
                <div className="col-span-12 md:col-span-2">
                    <p className="text-xs text-textGray font-medium">{formatDate(data.createdAt)}</p>
                </div>
                <div className="col-span-12 md:col-span-6 flex flex-col gap-2">

                    <p className="text-xs text-main font-light">
                        <span className="font-medium">Doctor:</span>{" "}
                        {data.doctorId.firstName}  {data.doctorId.secondName}
                    </p>

                    <p className="text-xs text-main font-light">
                        <span className="font-medium">Examen:</span>{" "}
                        {data.examenDescription}
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
                    action={async () => await deleteRecord()}
                    loading={loading}
                    isOpen={openDeleteModal}
                    close={() => setOpenDeleteModal(false)} />
            }
        </>
    );
};

export default ExamElement;
