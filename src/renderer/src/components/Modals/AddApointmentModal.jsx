import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button, Textarea } from '../Form';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AxiosInstancence from '../../axiosInstance';
import DectorSelector from "../../components/common/DectorSelector";
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import user from '../../state/user';


function AddAppointmentModal({ closeModal, isOpen, datas, mutate }) {
  const [loading, setLoading] = useState(false);
  const userData = useRecoilValue(user);
  const { patientId } = useParams();
  const formik = useFormik({
    initialValues: {
      appointmentDate: datas?.visitDate ? datas.visitDate : '',
      startTime: datas?.visitDate ? datas.startTime : '',
      endTime: datas?.visitDate ? datas.endTime : '',
      doctor: datas?.visitDate ? datas.doctor._id : '',
      description: datas?.visitDate ? datas.description : '',
    },
    validationSchema: Yup.object({
      appointmentDate: Yup.string().required('Appointment date is required'),
      startTime: Yup.string().required('Start time is required'),
      endTime: Yup.string().required('End time is required'),
      doctor: Yup.string().required('Doctor is required'),
      description: Yup.string().required('Description Is Required'),
    }),
    onSubmit: async (values) => {
      // You can handle form submission here
      await createAppointement(values)
    },
  });

  const createAppointement = async (values) => {
    setLoading(true)
    try {
      await AxiosInstancence[datas.visitDate ? 'put' : 'post'](datas && datas.visitDate ? `appointments/update/${datas._id}` : 'appointments', {
        patient: patientId,
        visitDate: values.appointmentDate,
        ...values,
      })

      setTimeout(() => {
        setLoading(false);
        mutate && mutate()
        closeModal();
      }, 1000);

    } catch (error) {
      toast.error('something went wrong')
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.title ? 'Edit Appointment' : 'New Appointment'}
      width={'max-w-3xl'}
    >
      <form onSubmit={formik.handleSubmit} className="flex-colo gap-6">
        {/* Appointment Date */}
        <div className="w-full">
          <p className='text-sm mb-2'>Appointment Date</p>
          <input
            type="date"
            className='border p-2 rounded-md w-full'
            {...formik.getFieldProps('appointmentDate')}
          />
          {formik.touched.appointmentDate && formik.errors.appointmentDate ? (
            <div className="text-sm relative top-2 text-red-500">{formik.errors.appointmentDate}</div>
          ) : null}
        </div>

        {/* Start and End Time */}
        <div className="flex items-center gap-4 w-full">
          <div className="w-full">
            <p className='text-sm mb-3'>Start Time</p>
            <input
              className='border w-full rounded-md p-2'
              type="time"
              {...formik.getFieldProps('startTime')}
            />
            {formik.touched.startTime && formik.errors.startTime ? (
              <div className="text-sm relative top-2 text-red-500">{formik.errors.startTime}</div>
            ) : null}
          </div>

          <div className="w-full">
            <p className='text-sm mb-3'>End Time</p>
            <input
              className='p-2 border w-full rounded-md'
              type="time"
              {...formik.getFieldProps('endTime')}
            />
            {formik.touched.endTime && formik.errors.endTime ? (
              <div className="text-sm relative top-2 text-red-500">{formik.errors.endTime}</div>
            ) : null}
          </div>
        </div>

        {/* Doctor and Status */}
        <div className="w-full mt-5">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Doctor</p>
            {/* Implement Doctor Selector here */}
            <DectorSelector formik={formik} />

            {formik.touched.doctor && formik.errors.doctor ? (
              <p className="text-sm relative text-red-500">{formik.errors.doctor}</p>
            ) : null}
          </div>
        </div>

        {/* Description */}
        <Textarea
          label="Description"
          placeholder={
            datas?.message
              ? datas.message
              : 'She will be coming for a checkup.....'
          }
          color={true}
          rows={5}
          {...formik.getFieldProps('description')}
          value={formik.values.description}
        />

        <div className="w-full">
          {formik.touched.description && formik.errors.description ? (
            <p className="text-sm bottom-5 relative text-red-500">{formik.errors.description}</p>
          ) : null}
        </div>

        {/* Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            type="button"
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.title ? 'Discard' : 'Cancel'}
          </button>
          <Button
            disabled={!formik.isValid}
            label={datas && datas.visitDate ? 'update' : 'create'}
            loading={loading}
            type="submit"
            className="bg-blue-600 text-blue-100 text-sm p-4 rounded-lg font-light"
          >

          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddAppointmentModal;
