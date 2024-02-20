import React from 'react'
import useSWR from 'swr'
import Loader from './Loader'
import FetchError from '../error/FetchError';
import { backendBaseUrl } from '../../constant';
import { useParams } from 'react-router-dom';
import { birthYearFormater } from '../../util/formatDate';

const FormUserProfile = () => {
    const { patientId } = useParams();
    const { loading: patientLoading, data: patientData, error: patientError, mutate } = useSWR(`${backendBaseUrl}patient/${patientId}`)

    return (
        <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >{patientData &&
            (<>
                <img
                    src={patientData.ProfilePicture}
                    alt="setting"
                    className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
                />
                <div className="gap-2 flex-colo">
                    <h2 className="text-sm font-semibold">{patientData.firstName} {patientData.secondName}</h2>
                    <p className="text-xs text-textGray">{patientData.address}</p>
                    <p className="text-xs">{ }</p>
                    <p className="text-xs text-subMain bg-text font-medium py-1 px-4 rounded-full border-[0.5px] border-subMain">
                        {birthYearFormater(patientData.birthdate)} 
                    </p>
                </div>
            </>
            )}

            {
                patientLoading && <Loader className={'h-40'} />
            }

            {
                patientError && <>
                    <FetchError description={'Failed To load Patient'} action={() => mutate()} />
                </>
            }
        </div>
    )
}

export default FormUserProfile