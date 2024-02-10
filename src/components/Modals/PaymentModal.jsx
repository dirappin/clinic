import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Select } from '../Form';
import { sortsDatas } from '../Datas';
import { BiChevronDown } from 'react-icons/bi';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import { toast } from 'react-hot-toast';
import AxiosInstancence from '../../ axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import user from '../../state/user';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { backendBaseUrl } from '../../constant';

function PaymentModal({ closeModal, isOpen, data }) {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const patient = data;
  const [loading, setloading] = useState();
  const formik = useFormik({
    onSubmit: async (values) => await createPatient(values),
    initialValues: {
      payementMethod: 'cash',
    },
    validationSchema: Yup.object({
      payementMethod: Yup.string().required("field required")
    }),
  })

  const createPatient = async (values) => {
    setloading(true);
    try {
      const request = await AxiosInstancence.post(`${backendBaseUrl}medical-record/payement`, {
        invoiceId: invoiceId,
        patientId: patient.patientId._id,
        payementMethod: values.payementMethod
      });

      setloading(false);
      navigate()
    } catch (error) {
      toast.error('something went wrong');
      setloading(false);
    }
  }

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Generate Payment"
      width={'max-w-xl'}
    >
      <form onSubmit={formik.handleSubmit} className="flex-colo gap-6 pb-8 ">
        <div className="w-full">
          <p className="text-sm mb-3">Payment Method</p>
          <select onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.payementMethod} className='w-full py-3 px-4 border rounded-lg text-sm' name="status" id="">
            <option defaultChecked disabled className='text-gray-400 appearance-none pointer-events-none'>Payment Method...</option>
            {sortsDatas.method.map((option) => (<option key={option.id} className='bg-white text-sm appearance-none' value="">{option.name}</option>))}
          </select>
        </div>

        {/* button */}
        <Button
          loading={loading}
          label="Generate"
          Icon={CgSpinnerTwoAlt}
          type="submit"
        />
      </form>
    </Modal>
  );
}

export default PaymentModal;
