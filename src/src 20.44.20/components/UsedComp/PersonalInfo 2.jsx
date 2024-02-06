import React, { useState } from "react";
import Uploder from "../Uploader";
import { sortsDatas } from "../Datas";
import { Button, Input, Select } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import instance from "../../ axiosInstance";
import { cloudinaryUploadFile } from "../../util/cloudinary";
import { backendBaseUrl } from "../../constant";

function PersonalInfo({ titles }) {
  const [title, setTitle] = React.useState(sortsDatas.title[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedProfileImage, SetSelectedProfileImage] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      secondName: "",
      phoneNumber: "",
      emergencyContact: "",
      gender: "Male",
      birthdate: "",
      address: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("field required"),
      secondName: Yup.string().required("field required"),
      phoneNumber: Yup.string().required("field required"),
      emergencyContact: Yup.string().required("field required"),
      gender: Yup.string().required("field required"),
      birthdate: Yup.string().required("field required"),
      address: Yup.string().required("field required"),
    }),

    onSubmit: async (values) => {
      await createPatient(values);
    },
  });

  const createPatient = async (values) => {
    if (!selectedProfileImage)
      return toast.error("profile picture is required");
    setLoading(true);

    try {
      const imageUrl = await cloudinaryUploadFile(selectedProfileImage);
      const request = await instance.post("patient", {
        ...values,
        ProfilePicture: imageUrl,
      });

      setLoading(false);
      navigate("/patients/preview/" + request.data._id);
    } catch (error) {
      setError(
        error.response
          ? error.response.data.message
          : "something went worng please try again"
      );

      toast.error(
        error.response
          ? error.response.data.message
          : "something went worng please try again"
      );

      setLoading(false);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex-colo gap-4">
      {/* uploader */}
      <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Profile Image</p>
        <Uploder selectImage={(file) => SetSelectedProfileImage(file)} />
      </div>
      {/* select  */}
      {titles && (
        <div className="flex w-full flex-col gap-3">
          <p className="text-black text-sm">Title</p>
          <Select
            selectedPerson={title}
            setSelectedPerson={setTitle}
            datas={sortsDatas.title}
          >
            <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
              {title?.name} <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
      )}

      {/* fullName */}
      <div className="w-full">
        <Input
          value={formik.values.firstName}
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="First Name"
          color={true}
          type="text"
          errormessage={
            formik.errors.firstName &&
            formik.touched.firstName &&
            formik.errors.firstName
          }
        />
      </div>

      <div className="w-full">
        <Input
          value={formik.values.secondName}
          label="Second Name"
          color={true}
          type="text"
          name={"secondName"}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errormessage={
            formik.errors.secondName &&
            formik.touched.secondName &&
            formik.errors.secondName
          }
        />
      </div>

      {/* phone */}
      <div className="w-full">
        <Input
          value={formik.values.phoneNumber}
          label="Phone Number"
          color={true}
          type="tel"
          onBlur={formik.handleBlur}
          name="phoneNumber"
          onChange={formik.handleChange}
          errormessage={
            formik.errors.phoneNumber &&
            formik.touched.phoneNumber &&
            formik.errors.phoneNumber
          }
        />
      </div>
      {/* email */}
      {!titles && (
        <>
          {/* gender */}
          <div className="flex w-full flex-col gap-3">
            <label className="text-black text-sm">Gender</label>
            <select
              name="gender"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.gender}
              className="w-full border p-2 rounded-md"
            >
              <option defaultChecked>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* emergancy contact */}

          <div className="w-full">
            <Input
              errormessage={
                formik.errors.emergencyContact &&
                formik.touched.emergencyContact &&
                formik.errors.emergencyContact
              }
              name="emergencyContact"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.emergencyContact}
              label="Emergency Cotact"
              color={true}
              type="tel"
            />
          </div>

          {/* date */}
          <div className="w-full flex items-center gap-2">
            <label htmlFor="">birthdate</label>
            <input
              name="birthdate"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="date"
              className="border p-2 px-4 rounded-md"
              errormessage={
                formik.errors.birthdate &&
                formik.touched.birthdate &&
                formik.errors.birthdate
              }
            />
            <span className="text-red-500">
              {formik.errors.birthdate &&
                formik.touched.birthdate &&
                formik.errors.birthdate}
            </span>
          </div>

          {/* address */}
          <div className="w-full">
            <Input
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Address"
              color={true}
              type="text"
              errormessage={
                formik.errors.address &&
                formik.touched.address &&
                formik.errors.address
              }
            />
          </div>
        </>
      )}
      {/* submit */}
      <div className="w-full">
        <Button
          type="submit"
          loading={loading}
          label={"Create Patient"}
          Icon={HiOutlineCheckCircle}
        />
      </div>
    </form>
  );
}

export default PersonalInfo;
