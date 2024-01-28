import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { useParams } from 'react-router-dom';
import { Button, Select, Textarea } from '../../components/Form';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import AxiosInstance from '../../ axiosInstance';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cloudinaryMiltifilesUpload } from '../../util/cloudinary'
import useSWR from 'swr';
import { backendBaseUrl } from '../../constant';
import { birthYearFormater } from '../../util/formatDate';
import Loader from '../../components/common/Loader';
import FetchError from '../error/fetchError';
import FilesUploader from '../../components/MultiFilesUploader';
import { useNavigate } from 'react-router-dom';

const NewMedicalRecordTriage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const { patientId } = useParams();
  const [attachedImages, setAttachedImages] = useState([]);
  const [createTriageLoading, setCreateTriageLoading] = useState(false)
  const { loading: patientLoading, data: patientData, error: patientError, mutate } = useSWR(`${backendBaseUrl}patient/${patientId}`)
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
        patientId:patientId
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
      complains: '',
      vitalsigns:'' // Changed from 'plaintes' to 'complains'
    },
    validationSchema: Yup.object({
      doctor: Yup.string().required('Doctor is required'),
      poid: Yup.string().required('Poids is required'),
      TA: Yup.string().required('TA is required'),
      PU: Yup.string().required('PU is required'),
      Temperature: Yup.string().required('Temperature is required'),
      saturometre: Yup.string().required('Saturometre is required'),
      complains: Yup.string().required('Complains is required'),
      vitalsigns: Yup.string().required('vital signs is required'),
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
                {birthYearFormater(patientData.birthdate)} yrs
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
              {loading && <Loader className={'h-40'} />}
              {error && <FetchError description={'Failed to get doctors please try again'} action={() => fetchDoctors()} />}
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
                    <span className="text-red-500 mt-3">
                      {formik.errors.doctor}
                    </span>
                  )}
                </>
              )}
            </div>

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

            <Textarea
              label="Vital Signs"
              color={true}
              rows={3}
              placeholder={'Vital Signs, ....'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.PU}
              name="vitalsigns"
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
