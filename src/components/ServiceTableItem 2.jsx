import React, { useState } from 'react'
import { MenuSelect } from './Form'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from "react-icons/ri"
import AddEditServiceModal from './Modals/AddEditServiceModal'
import { formatDate } from '../util/formatDate'


const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";


const ServiceTableItem = ({ item }) => {
    const [openModal, setOpenModal] = useState();

    const DropDown1 = [
        {
            title: "Edit",
            icon: FiEdit,
            onClick: () => {
                setOpenModal(true);
            },
        },
        {
            title: "Delete",
            icon: RiDeleteBin6Line,
            onClick: () => {
                toast.error("This feature is not available yet");
            },
        },
    ];

    return (
        <tr
            key={item._id}
            className="border-b border-border hover:bg-greyed transitions"
        >
            <td className={tdclass}>
                <h4 className="text-sm font-medium">{item?.name}</h4>
            </td>
            <td className={tdclass}>{formatDate(item.createdAt) || ''}</td>
            <td className={`${tdclass} font-semibold`}>{item?.price}</td>
            <td className={tdclass}>

            </td>
            <td className={tdclass}>
                <MenuSelect datas={DropDown1} item={item}>
                    <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                        <BiDotsHorizontalRounded />
                    </div>
                </MenuSelect>
            </td>

            {openModal && (
                <AddEditServiceModal
                    datas={data}
                    isOpen={isOpen}
                    method={'post'}
                    url={'service'}
                    closeModal={onCloseModal}
                    mutate={fetchMutateFunction.current}
                />
            )}
        </tr>
    )
}

export default ServiceTableItem