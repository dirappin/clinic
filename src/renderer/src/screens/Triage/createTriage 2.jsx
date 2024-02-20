import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button, Select, Textarea } from '../../components/Form';
import { BiChevronDown } from 'react-icons/bi';
import { memberData } from '../../components/Datas';
import { toast } from 'react-hot-toast';
import MedicineDosageModal from '../../components/Modals/MedicineDosage';
import { FaTimes } from 'react-icons/fa';
import Uploader from '../../components/Uploader';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import AxiosInstance from '../../ axiosInstance';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TbFaceIdError } from "react-icons/tb";
import { cloudinaryMiltifilesUpload } from '../../util/cloudinary'


const doctorsData = memberData.map((item) => {
  return {
    id: item.id,
    name: item.title,
  };
});


const createTriage = async (values) => {
  try {
    setCreateRecordLoading(true);
    const uploadAttachedImages =
      attachedImages.length < 1
        ? []
        : await cloudinaryMiltifilesUpload(attachedImages);
    await AxiosInstance.post("medical-record/create", {
      doctorId: userData._id,
      patientId: patientId,
      attachedImages: uploadAttachedImages,
      Treatments: mappedServiceData
        .filter((item) => item.checked)
        .map((service) => service._id),
      prescribeMedecin: mapMedecines(),
      ...values,
    });

    setCreateRecordLoading(false);
    navigate(`/patients/preview/${patientId}`);
    toast.success("record successfully");
  } catch (error) {
    console.log(error);
    setCreateRecordLoading(false);
    toast.error("Failed to create medical record");
  }
};

const NewMedicalRecordTriage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [userLoading,setUserLoading] = useState(false);

  const fetchDoctors = async () => {
    setError(null);
    try {
      setLoading(true);
      const response = await AxiosInstance.get('/user/doctors');
      setDoctors(response.data);
    } catch (error) {
      setError(error.message || 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    setError(null);
    try {EE
      setLoading(true);
      const response = await AxiosInstance.get('/user/doctors');
      setDoctors(response.data);
    } catch (error) {
      setError(error.message || 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const formik = useFormik({
    initialValues: {
      doctor: '',
      poids: '',
      ta: '',
      pu: '',
      temperature: '',
      saturometre: '',
      complains: '', // Changed from 'plaintes' to 'complains'
    },
    validationSchema: Yup.object({
      doctor: Yup.string().required('Doctor is required'),
      poids: Yup.string().required('Poids is required'),
      ta: Yup.string().required('TA is required'),
      pu: Yup.string().required('PU is required'),
      temperature: Yup.string().required('Temperature is required'),
      saturometre: Yup.string().required('Saturometre is required'),
      complains: Yup.string().required('Complains is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <Link
          to={`/patients/preview/1`}
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">New Triage Record</h1>
      </div>

      <div className="grid grid-cols-12 gap-6 my-8 items-start">


        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <img
            src="/images/user7.png"
            alt="setting"
            className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
          />
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">Deogratias Ndayazi</h2>
            <p className="text-xs text-textGray">deo@gmail.com</p>
            <p className="text-xs">+256 778 519 051</p>
            <p className="text-xs text-subMain bg-text font-medium py-1 px-4 rounded-full border-[0.5px] border-subMain">
              32 yrs{' '}
            </p>
          </div>

        </div>

        <form
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 create-triage-form lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex w-full flex-col gap-5">
            {/* Doctor Dropdown */}
            <div className="flex flex-col gap-3">
              <label htmlFor="">Doctor</label>
              {loading && <p>...loading</p>}
              {error && (
                <div className='w-full  p-4 text-center bg-gray-300 rounded-lg'>
                  <div className="w-full flex justify-center py-4 items-center">
                    <TbFaceIdError className='text-4xl' />
                  </div>

                  <p className='text-gray-700 text-sm mb-3'>Failed to get doctors please try again</p>
                  <button onClick={() => fetchDoctors()} disabled={loading} type='submit' className='bg-gray-700 active:bg-gray-600 px-5 py-2 rounded-md text-white'>
                    {loading && '...loading'}
                    {!loading && "Re-try"}
                  </button>
                </div>
              )}
              {doctors.length > 0 && !error && (
                <>
                  <select
                    className="border py-2 text-sm px-4 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.doctor}
                    name="doctor"
                  >
                    {!error && <>
                      <option value="" disabled>
                        Select Doctor
                      </option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                          {doctor.firstName} {doctor.secondName}
                        </option>
                      ))}</>}

                  </select>
                  {formik.errors.doctor && formik.touched.doctor && (
                    <span className="text-red-500">
                      {formik.errors.doctor}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Poids */}
            <Textarea
              label="Poids"
              color={true}
              rows={3}
              placeholder={'Poids ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.poids}
              name="poids"
            />
            {formik.errors.poids && formik.touched.poids && (
              <span className="text-red-500">{formik.errors.poids}</span>
            )}

            {/* TA */}
            <Textarea
              label="TA"
              color={true}
              rows={3}
              placeholder={'TA ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ta}
              name="ta"
            />
            {formik.errors.ta && formik.touched.ta && (
              <span className="text-red-500">{formik.errors.ta}</span>
            )}

            {/* PU */}
            <Textarea
              label="PU"
              color={true}
              rows={3}
              placeholder={'PU, ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pu}
              name="pu"
            />
            {formik.errors.pu && formik.touched.pu && (
              <span className="text-red-500">{formik.errors.pu}</span>
            )}

            {/* Température */}
            <Textarea
              label="Température"
              color={true}
              rows={3}
              placeholder={'Température, ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.temperature}
              name="temperature"
            />
            {formik.errors.temperature && formik.touched.temperature && (
              <span className="text-red-500">{formik.errors.temperature}</span>
            )}

            {/* SATUROMAITRE */}
            <Textarea
              label="SATUROMETRE"
              color={true}
              rows={3}
              placeholder={'SATUROMETRE ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.saturomaitre}
              name="saturometre"
            />
            {formik.errors.saturometre && formik.touched.saturometre && (
              <span className="text-red-500">{formik.errors.saturometre}</span>
            )}

            {/* Complains */}
            <Textarea
              label="Complains"
              color={true}
              rows={3}
              placeholder={'Complains ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.complains}
              name="complains"
            />
            {formik.errors.complains && formik.touched.complains && (
              <span className="text-red-500">{formik.errors.complains}</span>
            )}

            {/* Attachment */}
            <div className="flex w-full flex-col gap-4">
              <p className="text-black text-sm">Attachments</p>
              <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {[1, 2, 3, 4].map((_, i) => (
                  <div className="relative w-full" key={i}>
                    <img
                      src={`https://placehold.it/300x300?text=${i}`}
                      alt="patient"
                      className="w-full  md:h-40 rounded-lg object-cover"
                    />
                    <button
                      onClick={() =>
                        toast.error('This feature is not available yet.')
                      }
                      className="bg-white rounded-full w-8 h-8 flex-colo absolute -top-1 -right-1"
                    >
                      <FaTimes className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              <Uploader setImage={{}} />
            </div>

            {/* Submit */}
            <Button
              label={'Save'}
              Icon={HiOutlineCheckCircle}
              onClick={() => {
                toast.error('This feature is not available yet');
              }}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewMedicalRecordTriage;
