import React, { useRef, useState } from "react";
import Layout from "../../Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button, Select, Textarea } from "../../components/Form";
import { memberData } from "../../components/Datas";
import { toast } from "react-hot-toast";
import MedicineDosageModal from "../../components/Modals/MedicineDosage";
import { HiOutlineCheckCircle } from "react-icons/hi";
import FormUserProfile from "../../components/common/FormUserProfile";
import { useFormik } from "formik";
import { cloudinaryMiltifilesUpload } from "../../util/cloudinary";
import FilesUploader from "../../components/MultiFilesUploader";
import * as Yup from "yup";
import DectorSelector from "../../components/common/DectorSelector";
import AxiosInstancence from "../../ axiosInstance";

function NewLoboratoireRecord() {
  const [isOpen, setIsOpen] = useState(false);
  const { patientId } = useParams();
  const attachedImagesRef = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const validationSchema = Yup.object({
    doctor: Yup.string().required("Doctor can not be empty"),
    resulta: Yup.string().required("Resulta is required"),
    description: Yup.string().required("Description is required"),
    diagnosis: Yup.string().required("Diagnosis is required"),
  });

  // Define initial form values
  const initialValues = {
    doctor: "",
    resulta: "",
    description: "",
    diagnosis: "",
  };

  // Define the form submission function
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const attachedImages =
        attachedImagesRef.current.length < 1 ? [] : await cloudinaryMiltifilesUpload(attachedImagesRef.current);

      await AxiosInstancence.post("exams/create-exam-result", {
        patientId: patientId,
        doctorId: values.doctor,
        examenDescription: values.description,
        diagnosis: values.diagnosis,
        result: values.resulta,
        attachedImages: attachedImages,
      });

      navigate(-1);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      toast.error("Filed to create record");
    }
  };

  // Use useFormik hook to manage the form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

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
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          <form
            className="flex w-full flex-col gap-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Doctor</p>
              <DectorSelector formik={formik} />

              {formik.touched.doctor?.name && formik.errors.doctor?.name && (
                <span className="text-sm relative bottom-3 text-red-500">
                  {formik.errors.doctor.name}
                </span>
              )}
            </div>

            <Textarea
              label="Resulta"
              color={true}
              rows={3}
              placeholder={"Bad breath, toothache, ...."}
              id="resulta"
              name="resulta"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resulta}
            />
            {formik.touched.resulta && formik.errors.resulta && (
              <span className="text-[12px]  relative bottom-4 text-right text-red-500">
                {formik.errors.resulta}
              </span>
            )}

            <Textarea
              label="Description"
              color={true}
              rows={3}
              placeholder={"Bad breath, toothache, ...."}
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <span className="text-[12px]  relative bottom-4 text-right text-red-500">
                {formik.errors.description}
              </span>
            )}

            <Textarea
              label="Diagnosis"
              color={true}
              rows={3}
              placeholder={"Bad breath, toothache, ...."}
              id="diagnosis"
              name="diagnosis"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.diagnosis}
            />
            {formik.touched.diagnosis && formik.errors.diagnosis && (
              <span className="text-[12px]  relative bottom-4 text-right text-red-500">
                {formik.errors.diagnosis}
              </span>
            )}

            <div className="flex w-full flex-col gap-4">
              <p className="text-black text-sm">Attachments</p>
            </div>

            <FilesUploader
              selectImage={(images) => {
                attachedImagesRef.current = [...images];
              }}
            />

            <Button
              loading={loading}
              disabled={!formik.isValid}
              label={"Save"}
              Icon={HiOutlineCheckCircle}
              type="submit"
              onClick={formik.handleSubmit}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewLoboratoireRecord;
