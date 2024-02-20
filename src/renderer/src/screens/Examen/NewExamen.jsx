import React, { useState } from "react";
import Layout from "../../Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Select, Textarea } from "../../components/Form";
import { memberData } from "../../components/Datas";
import { toast } from "react-hot-toast";
import MedicineDosageModal from "../../components/Modals/MedicineDosage";
import { FaTimes } from "react-icons/fa";
import Uploader from "../../components/Uploader";
import { HiOutlineCheckCircle } from "react-icons/hi";
import FormUserProfile from "../../components/common/FormUserProfile";
import DectorSelector from "../../components/common/DectorSelector";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "../../util/cn";
import AxiosInstancence from "../../axiosInstance";

const NewExamen = () => {
  const { patientId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      doctor: null,
      examenDescription: null
    },
    onSubmit: async (values) => {
      await createExam(values)
    },
    validationSchema: Yup.object({
      doctor: Yup.string().required("doctor can't be null"),
      examenDescription: Yup.string().required('Description is required'),
    })
  });

  const createExam = async (values) => {
    SetLoading(true);
    try {
      const request = await AxiosInstancence.post('exams', {
        examenDescription: values.examenDescription,
        patientId: patientId,
        doctorId: values.doctor
      })
      SetLoading(false)
      toast.success('successfully created');
      navigate(-1)
    } catch (error) {
      console.log(error);
      SetLoading(false);
      toast.error('Failed To Create Exam')
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
        <h1 className="text-xl font-semibold">New Exam</h1>
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <FormUserProfile />
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          <form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-5">
            {/* doctor */}
            <DectorSelector formik={formik} />

            {/* Examen Demande */}
            <Textarea
              defaultValue={formik.values.examenDescription}
              onChange={formik.handleChange}
              label="Examen Demande"
              color={true}
              rows={3}
              placeholder={"Examen Demande...."}
              name={'examenDescription'}
            />

            <p
              className={cn(
                "text-red-500 text-[10px] text-right top-[5.5rem]   min-h-[5px]"
              )}
            >
              {formik.errors.description &&
                formik.touched.description &&
                formik.errors.description
              }

            </p>

            {/* submit */}
            <Button
              loading={loading}
              disabled={!formik.isValid}
              label={"Save"}
              Icon={HiOutlineCheckCircle}
              type="submit"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewExamen;
