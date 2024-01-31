import useSWR from "swr";
import { backendBaseUrl } from "../../constant";
import React from 'react'
import { MdFilterListOff } from "react-icons/md";


const DectorSelector = ({ formik }) => {
    const { loading, data: doctors, mutate, error } = useSWR(`${backendBaseUrl}user/doctors`);
    return (
        <div className="flex flex-col gap-3">
            {doctors && doctors.length < 1 &&
                <div className="w-full py-4 px-4 flex-col bg-gray-200 flex items-center justify-center rounded-lg ">
                    <MdFilterListOff className="text-4xl text-gray-700" />
                    <p className="text-gray-500 mt-2">No Doctor Recorded Yet</p>
                    <button onClick={() => mutate()} className="px-4 active:bg-gray-500 py-2 bg-gray-600 mt-3 rounded-lg text-white" type="button">{loading ? '...loading' : 'Refresh'}</button>
                </div>
            }

            {loading && <Loader className={'h-40'} />}
            {error && <FetchError description={'Failed to get doctors please try again'} action={() => mutate()} />}
            {doctors && doctors.length > 0 && !error && (
                <>
                    <select
                        className="border py-2 text-sm px-4 rounded-md"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.doctor}
                        name="doctor"
                    >
                        {!error && <>
                            <option defaultChecked={true} disabled>
                                Select Doctor
                            </option>

                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.firstName} {doctor.secondName}
                                </option>
                            ))}</>}

                    </select>

                    {formik.errors.doctor && formik.touched.doctor && (
                        <span className="text-red-500 text-right text-[12px]">
                            {formik.errors.doctor}
                        </span>
                    )}
                </>
            )}
        </div>
    )
}

export default DectorSelector