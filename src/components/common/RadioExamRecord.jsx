import React from 'react';

import { Button } from '../../components/Form';
import { BiPlus } from 'react-icons/bi';
import MedicalRadiographiRecodModal from '../../components/Modals/MedicalRadiographiRecodModal';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { backendBaseUrl } from '../../constant';
import FetchError from '../../screens/error/fetchError';
import Loader from './Loader';
import EmptyResult from './EmptyResult';
import RadioExamRecordElement from './RadioExamRecordElement';


const RadioExamRecord = ({ url }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [datas, setDatas] = React.useState({});
    const navigate = useNavigate();
    const { patientId } = useParams()
    const { data, loading, error, mutate } = useSWR(`${backendBaseUrl}${url}/all/${patientId}`)


    return (
        <>
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-4">
                    <h1 className="text-sm font-medium sm:block hidden">
                        Radiographie Record
                    </h1>
                    <div className="sm:w-1/4 w-full">
                        <Button
                            label="New Record"
                            Icon={BiPlus}
                            onClick={() => {
                                navigate(`/${url}/visiting/${patientId}`);
                            }}
                        />
                    </div>
                </div>
                {loading && <Loader className={'h-40'} />}
                {error && <FetchError action={() => mutate()} description={'Failed to load Records'} />}
                {data && data.length < 1 && <EmptyResult disableButton lable={'No Record Yet'} />}

                {data && data.map((data) => (
                    <RadioExamRecordElement key={data._id} data={data} />
                ))}
            </div>
        </>
    )
}

export default RadioExamRecord