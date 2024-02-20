import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button, Input, Select, Textarea } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AxiosInstancence from '../../axiosInstance';

function AddEditMedicineModal({ closeModal, isOpen, datas, mutate }) {
  const [measures, setMeasures] = useState(sortsDatas.measure[0]);
  const [loading, setLoading] = useState()

  useEffect(() => {
    if (datas?.name) {
      setMeasures({
        id: datas.measure,
        name: datas.measure,
      });
    }
  }, [datas]);

  // Define Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Medicine Name is required'),
    price: Yup.number().required('Price is required').min(0.1),
    quantity: Yup.number().required('Quantity is required').min(0.1),
    description: Yup.string().required('Description is required'),
  });

  // Create the formik object using the useFormik hook
  const formik = useFormik({
    initialValues: {
      name: datas?.name || '',
      price: datas?.price || 0,
      quantity: datas?.quantity || 0,
      description: datas?.description || '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      addRequest(values);
    },
  });

  const addRequest = async (values) => {
    setLoading(true)
    try {
      await AxiosInstancence.post(`pharmacy/${datas.name ? 'update-medecin/' + datas._id : 'create-medecin'}`, {
        ...values
      });

      if (mutate) mutate();
      setTimeout(() => {
        setLoading(false);
        closeModal();
      }, 2000);
    } catch (error) {
      toast.error('Request Failed');
      setLoading(false);
    }
  }

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? 'Edit Medicine' : 'New Medicine'}
      width={'max-w-3xl'}
    >
      <form className="flex-colo gap-6" onSubmit={formik.handleSubmit}>
        <Input
          required
          type={'text'}
          label="Medicine Name"
          color={true}
          placeholder={datas?.name && datas.name}
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          defaultValue={datas?.name && datas.name}
          errormessage={
            formik.errors.name &&
            formik.touched.name &&
            formik.errors.name
          }
        />

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            required
            label="Price (USD)"
            type="number"
            color={true}
            placeholder={datas?.price ? datas.price : 0}
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            errormessage={
              formik.errors.price &&
              formik.touched.price &&
              formik.errors.price
            }
          />

          <Input
            required
            label="Quantity"
            type="number"
            color={true}
            placeholder={datas?.quantity ? datas.quantity : 0}
            name="quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
            errormessage={
              formik.errors.quantity &&
              formik.touched.quantity &&
              formik.errors.quantity
            }
          />
        </div>

        {/* description */}
        <Textarea
          required
          label="Description"
          placeholder="Write description here..."
          color={true}
          rows={5}
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          errormessage={
            formik.errors.description &&
            formik.touched.description &&
            formik.errors.description
          }
        />
        {/* buttons */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            type="button"
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.name ? 'Discard' : 'Cancel'}
          </button>
          <Button
            loading={loading}
            label="Save"
            Icon={HiOutlineCheckCircle}
            type="submit"
            disabled={formik.isSubmitting && !formik.isValid}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddEditMedicineModal;
