import React, { useState } from 'react'
import { MenuSelect } from './Form';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { formatDate } from '../util/formatDate';
import { birthYearFormater } from '../util/formatDate';
import toast from 'react-hot-toast';
import { FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import AxiosInstancence from '../ axiosInstance';
import DeleteModal from './Modals/DeleteModal';

const tdclasse = "text-start text-sm py-4 px-2 whitespace-nowrap";
const PatientListItem = ({ item, index, mutate }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const deletePatient = async () => {
        setLoading(true)
        try {
            await AxiosInstancence.delete(`patient/${item._id}`);
            setLoading(false)
            mutate();
            setOpenDeleteModal(false);
        } catch (error) {
            setLoading(false)
            toast.error('Failed to delete the record');
        }
    }

    return (
        <tr
            key={item._id}
            className="border-b border-border hover:bg-greyed transitions"
        >
            <td className={tdclasse}>{index + 1}</td>
            <td className={tdclasse}>
                <div className="flex gap-4 items-center">
                    <span className="w-12">
                        <img
                            src={item.ProfilePicture}
                            alt={item.firstName}
                            className="w-full h-12 rounded-full object-cover border border-border"
                        />
                    </span>

                    <div>
                        <h4 className="text-sm font-medium">
                            {item.firstName + " "}
                            {item.secondName}{" "}
                        </h4>
                        <p className="text-xs mt-1 text-textGray">
                            {item.phoneNumber}
                        </p>
                    </div>
                </div>
            </td>
            <td className={tdclasse}>
                {formatDate(item.createdAt)}
            </td>

            <td className={tdclasse}>
                <span
                    className={`py-1 px-4 ${item.gender === "Male"
                        ? "bg-subMain text-subMain"
                        : "bg-orange-500 text-orange-500"
                        } bg-opacity-10 text-xs rounded-xl`}
                >
                    {item.gender}
                </span>
            </td>

            <>
                <td className={tdclasse}>
                    {birthYearFormater(item.birthdate)}
                </td>
            </>

            <td className={tdclasse}>
                <MenuSelect
                    datas={[
                        {
                            title: "View",
                            icon: FiEye,
                            onClick: () => {
                                navigate("/patients/preview/" + item._id);
                            },
                        },
                        {
                            title: "Delete",
                            icon: RiDeleteBin6Line,
                            onClick: () => {
                                setOpenDeleteModal(true)
                            },
                        },
                    ]}
                >
                    <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                        <BiDotsHorizontalRounded />
                    </div>
                </MenuSelect>
            </td>

            {
                openDeleteModal &&
                <DeleteModal
                    action={async () => await deletePatient()}
                    loading={loading}
                    isOpen={openDeleteModal}
                    close={() => setOpenDeleteModal(false)} />
            }
        </tr>
    )
}

export default PatientListItem