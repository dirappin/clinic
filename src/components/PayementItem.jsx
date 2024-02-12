import React from 'react'
import { formatDate } from '../util/formatDate';
import { FiEye } from 'react-icons/fi';
import { useState,useEffect } from 'react';

const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";
import { useNavigate } from 'react-router-dom';

const PayementItem = ({ item }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        let accumaltor = 0;
        const calculateTotalaAmount = () => {

            if (item) {
                const accumilatedPrices = item.Treatments.reduce((ReduceAccumilator, currentItem) => (ReduceAccumilator + currentItem.price), 0);
                accumaltor += accumilatedPrices;

                const accumilatedPrices2 = item.prescribeMedecin.reduce((ReduceAccumilator, currentItem) => parseFloat(currentItem.id.price) + ReduceAccumilator, 0);
                accumaltor += accumilatedPrices2;


                setTotalPrice(accumaltor)
            }
        }
        calculateTotalaAmount();
    }, [])

    return (
        <tr
            key={item._id}
            className="border-b border-border hover:bg-greyed transitions"
        >
            <td className={tdclass}>
                <p className="text-xs">{formatDate(item.createdAt)}</p>
            </td>
            <td className={tdclass}>
                <h4 className="text-xs font-medium">
                    {item.senderId.firstName}
                </h4>
                <p className="text-xs mt-1 text-textGray">
                    {item.senderId.phoneNumber}
                </p>
            </td>

            <td className={tdclass}>
                <p className="text-xs font-semibold">{`$${totalPrice}`}</p>
            </td>

            <td className={tdclass}>
                <p className="text-sm bg-blue-100 border border-blue-500 text-blue-800 text-center rounded-lg py-1  font-normal ">{`${item.payementMethod}`}</p>
            </td>

            <td className={tdclass}>
                <button
                    onClick={() => navigate(`/payments/preview/${item.attachedMedicalRecordId}`)}
                    className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10"
                >
                    <FiEye />
                </button>
            </td>
        </tr>
    )
}

export default PayementItem