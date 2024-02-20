import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button, Input, Switchi, Textarea } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import AxiosInstancence from "../../axiosInstance";


function AddEditServiceModal({ closeModal, isOpen, title, mutate, url, method, defaulValue,id }) {
  console.log(defaulValue)
  const [loading, setLoading] = useState();
  const formik = useFormik({
    initialValues: {
      name: defaulValue && defaulValue.name ? defaulValue.name : "",
      description: defaulValue && defaulValue.description ? defaulValue.description : "",
      price: defaulValue && defaulValue.price ? defaulValue.price : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name can't be empty"),
      description: Yup.string().required("Name can't be empty"),
      price: Yup.number().required("Price is required").min(0.1).required("Price can't be 0")
    }),
    onSubmit: async (values) => await createServiceRequest(values)
  });


  const createServiceRequest = async (values) => {
    setLoading(true)
    try {
      await AxiosInstancence[method](url, {
        name: values.name,
        description: values.description,
        price: values.price
      })
      setLoading(false);
      mutate();
      closeModal();
    } catch (error) {
      setLoading(false);
      toast.error('Failed to create service')
    }
  }

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={title}
      width={"max-w-3xl"}
    >
      <form onSubmit={formik.handleSubmit} className="flex-colo gap-6">
        <Input
          errormessage={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
          name={'name'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          label="Service Name"
          color={true}
          type={'name'}
          placeholder={'john doe..'}
        />

        <Input
          errormessage={formik.touched.price && formik.errors.price ? formik.errors.price : ''}
          name={'price'}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
          label="Price ($)"
          type="number"
          color={true}
          placeholder={'100$'}
        />

        {/* des */}
        <Textarea
          name={'description'}
          id="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          label="Description"
          placeholder="Write description here..."
          color={true}
          rows={5}
        />

        <div className="w-full flex justify-end">
          <span className="text-[12px]  relative bottom-4 text-right text-red-500">
            {formik.touched.description && formik.errors.description ? formik.errors.description : ''}
          </span>
        </div>


        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {"Cancel"}
          </button>
          <Button
            disabled={!formik.isValid || loading}
            label="Save"
            Icon={HiOutlineCheckCircle}
            loading={loading}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddEditServiceModal;
