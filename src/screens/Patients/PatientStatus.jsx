import React from 'react'
import useSWR from 'swr';
import { backendBaseUrl } from '../../constant';
import CardStatusFetchError from '../../components/error/CardStatusFetchError';
import Loader from '../../components/common/Loader';



const PatientStatus = ({ box,path }) => {
    const { isLoading, data, error } = useSWR(`${backendBaseUrl}patient/${path}`, {
        revalidateOnFocus: true,
        revalidateOnMount: true,
    });

    return (
        <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
        >
            {error && <CardStatusFetchError />}
            {isLoading && <Loader className={'h-10'} />}
            {!error &&
                <>
                    <div className="w-3/4">
                        <h2 className="text-sm font-medium">{box.title}</h2>
                        <h2 className="text-xl my-6 font-medium">{typeof data === "number" && data}</h2>
                        <p className="text-xs text-textGray">
                            Total Patients <span className={box.color[1]}>{typeof data === "number" && data}</span>{" "}
                            {box.title === "Today Patients"
                                ? "today"
                                : box.title === "Monthly Patients"
                                    ? "this month"
                                    : "this year"}
                        </p>
                    </div>
                    <div
                        className={`w-10 h-10 flex-colo rounded-md text-white text-md ${box.color[0]}`}
                    >
                        <box.icon />
                    </div>
                </>
            }
        </div>
    )
}

export default PatientStatus