import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { useParams } from 'react-router-dom';
import { Button, Select, Textarea } from '../../components/Form';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import AxiosInstance from '../../axiosInstance';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cloudinaryMiltifilesUpload } from '../../util/cloudinary'
import useSWR from 'swr';
import { backendBaseUrl } from '../../constant';
import { birthYearFormater } from '../../util/formatDate';
import Loader from '../../components/common/Loader';
import FetchError from '../../components/error/FetchError';
import FilesUploader from '../../components/MultiFilesUploader';
import { useNavigate } from 'react-router-dom';
import FormUserProfile from '../../components/common/FormUserProfile';
import DectorSelector from '../../components/common/DectorSelector';



const NewMedicalRecordTriage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const { patientId } = useParams();
  const [attachedImages, setAttachedImages] = useState([]);
  const [createTriageLoading, setCreateTriageLoading] = useState(false)
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchDoctors();
  }, []);

  const createTriage = async (values) => {
    try {
      setCreateTriageLoading(true);
      const uploadAttachedImages =
        attachedImages.length < 1
          ? []
          : await cloudinaryMiltifilesUpload(attachedImages);

      await AxiosInstance.post("triages", {
        ...values,
        attachedImages: uploadAttachedImages,
        patientId: patientId
      });
      setCreateTriageLoading(false);
      navigate(`/patients/preview/${patientId}`);
      toast.success("record successfully");
    } catch (error) {
      console.log(error);
      setCreateTriageLoading(false);
      toast.error("Failed to create medical record");
    }
  };

  const formik = useFormik({
    initialValues: {
      doctor: '',
      poid: '',
      TA: '',
      PU: '',
      Temperature: '',
      saturometre: '',
      complains: '',// Changed from 'plaintes' to 'complains'
    },
    validationSchema: Yup.object({
      doctor: Yup.string().required('Doctor is required'),
      poid: Yup.string().required('Poids is required'),
      TA: Yup.string().required('TA is required'),
      PU: Yup.string().required('PU is required'),
      Temperature: Yup.string().required('Temperature is required'),
      saturometre: Yup.string().required('Saturometre is required'),
      complains: Yup.string().required('Complains is required'),
    }),
    onSubmit: async (values) => {
      // Handle form submission logic here
      await createTriage(values);
    },
  });

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">New Triage Record</h1>
      </div>

      <div className="grid grid-cols-12 gap-6 my-8 items-start">
        <FormUserProfile />
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
            <DectorSelector formik={formik} />

            {/* Poids */}
            <Textarea
              label="Poid"
              color={true}
              rows={3}
              placeholder={'Poids ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.poid}
              name="poid"
            />
            {formik.errors.poid && formik.touched.poid && (
              <span className="text-red-500">{formik.errors.poid}</span>
            )}

            {/* TA */}
            <Textarea
              label="TA"
              color={true}
              rows={3}
              placeholder={'TA ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.TA}
              name="TA"
            />
            {formik.errors.TA && formik.touched.TA && (
              <span className="text-red-500">{formik.errors.TA}</span>
            )}

            {/* PU */}
            <Textarea
              label="PU"
              color={true}
              rows={3}
              placeholder={'PU, ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.PU}
              name="PU"
            />
            {formik.errors.PU && formik.touched.PU && (
              <span className="text-red-500">{formik.errors.PU}</span>
            )}

            {/* Température */}
            <Textarea
              label="Température"
              color={true}
              rows={3}
              placeholder={'Température, ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Temperature}
              name="Temperature"
            />
            {formik.errors.Temperature && formik.touched.Temperature && (
              <span className="text-red-500">{formik.errors.Temperature}</span>
            )}

            {/* SATUROMAITRE */}
            <Textarea
              label="SATUROMETRE"
              color={true}
              rows={3}
              placeholder={'SATUROMETRE ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.saturometre}
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
              <FilesUploader selectImage={(images) => setAttachedImages([...images])} />
            </div>

            {/* Submit */}
            <Button
              loading={createTriageLoading}
              label={'Save'}
              Icon={HiOutlineCheckCircle}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewMedicalRecordTriage;
