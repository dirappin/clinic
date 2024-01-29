import React from "react";
import MedicalRecodExamenModal from "../../components/Modals/MedicalRecodExamenModal";
import { FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { medicalRecodExamengeData } from "../../components/Datas";


const ExamElement = ({ data }) => {
    const [isOpen, setIsOpen] = React.useState(false);

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
                    <p className="text-xs text-textGray font-medium">{data.createdAt}</p>
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
                            toast.error("This feature is not available yet");
                        }}
                        className="text-sm flex-colo bg-white text-red-600 border border-border rounded-md w-2/4 md:w-10 h-10"
                    >
                        <RiDeleteBin6Line />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ExamElement;
