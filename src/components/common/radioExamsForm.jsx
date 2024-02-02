import React, { useRef, useState } from 'react';
import Layout from '../../Layout';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button, Textarea } from '../Form';
import { toast } from 'react-hot-toast';
import MedicineDosageModal from '../Modals/MedicineDosage';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import FilesUploader from '../MultiFilesUploader';
import { cloudinaryMiltifilesUpload } from '../../util/cloudinary';
import FormUserProfile from './FormUserProfile';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DectorSelector from './DectorSelector';
import AxiosInstancence from '../../ axiosInstance';


function RadioExamsForm({ url }) {
    const [isOpen, setIsOpen] = useState(false);
    const attachedImages = useRef([]);
    const [loading, setLoading] = useState(false);
    const {patientId} = useParams();


    console.log(patientId);

    const validationSchema = Yup.object().shape({
        doctor: Yup.string().required('Doctor is required'),
        result: Yup.string().required('Result is required'),
        description: Yup.string().required('Description is required'),
        diagnosis: Yup.string().required('Diagnosis is required'),
    });


    const formik = useFormik({
        initialValues: {
            doctor: "",
            patient:patientId,
            result: '',
            description: '',
            diagnosis: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            await create(values);
        },
    });


    const create = async (values) => {

        try {
            setLoading(true)
            const attachement = attachedImages.current.length < 1 ? [] : await cloudinaryMiltifilesUpload(attachedImages.current)
            const request = await AxiosInstancence.post(url, {
                ...values,
                attachedImages: attachement
            })
            setLoading(false);
            toast.success('successfully created');
        } catch (error) {
            setLoading(false)
            toast.error('something went wrong please try again');
        }

    }


    return (
        <Layout>
            {
                // modal
                isOpen && (
                    <MedicineDosageModal
                        isOpen={isOpen}
                        closeModal={() => {
                            setIsOpen(false);
                        }}
                    />
                )
            }
            <div className="flex items-center gap-4">
                <Link
                    to={`/patients/preview/1`}
                    className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
                >
                    <IoArrowBackOutline />
                </Link>
                <h1 className="text-xl font-semibold">New Medical Record</h1>
            </div>
            <div className=" grid grid-cols-12 gap-6 my-8 items-start">
                <FormUserProfile />
                {/* tab panel */}
                <form
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-delay="100"
                    data-aos-offset="200"
                    className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="flex w-full flex-col gap-5">
                        {/* doctor */}
                        <div className="flex w-full flex-col gap-3">
                            <p className="text-black text-sm">Doctor</p>
                            <DectorSelector formik={formik} />
                        </div>
                        {/* Result */}
                        <Textarea
                            onBlur={formik.handleBlur}
                            label="Result"
                            color={true}
                            rows={3}
                            placeholder={'Bad breath, toothache, ....'}
                            name="result"

                            value={formik.values.result}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.result && formik.errors.result && (
                            <div className="text-red-500 relative bottom-5 text-[12px] text-right">{formik.errors.result}</div>
                        )}
                        {/* Description */}
                        <Textarea
                            onBlur={formik.handleBlur}
                            label="Description"
                            color={true}
                            rows={3}
                            placeholder={'Bad breath, toothache, ....'}
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-500 text-right relative bottom-5 text-[12px]">{formik.errors.description}</div>
                        )}
                        {/* Diagnosis */}
                        <Textarea
                            onBlur={formik.handleBlur}
                            label="Diagnosis"
                            color={true}
                            rows={3}
                            placeholder={'Bad breath, toothache, ....'}
                            name="diagnosis"
                            value={formik.values.diagnosis}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.diagnosis && formik.errors.diagnosis && (
                            <div className="text-red-500 relative bottom-5 text-right text-[12px] ">{formik.errors.diagnosis}</div>
                        )}
                        {/* attachment */}
                        <div className="flex w-full flex-col gap-4">
                            <p className="text-black text-sm">Attachments</p>

                            <FilesUploader selectImage={(images) => { attachedImages.current = [...images] }} />
                        </div>
                        {/* submit */}
                        <Button
                            loading={loading}
                            label={'Save'}
                            Icon={HiOutlineCheckCircle}
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default RadioExamsForm;


