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
import AxiosInstancence from "../../ axiosInstance";
import { cloudinaryUploadFile } from "../../util/cloudinary";
import { usersRole } from "../../constant";
import { BiDollar } from "react-icons/bi";
import user from "../../state/user";
import { useRecoilValue } from "recoil";

function AgentPersonalInfo({ titles, data = {} }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedProfileImage, SetSelectedProfileImage] = useState();
  const userData = useRecoilValue(user);

  const formik = useFormik({
    initialValues: {
      firstName: data.user ? data.user.firstName : "",
      secondName: data.user ? data.user.secondName : "",
      phoneNumber: data.user ? data.user.phoneNumber : "",
      role: data.user ? data.user.role : "",
      salary: data.user ? data.user.salary : ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("field required"),
      secondName: Yup.string().required("field required"),
      phoneNumber: Yup.string().required("field required"),
      salary: Yup.number().required("field required"),
    }),

    onSubmit: async (values) => {
      await createPatient(values);
    },
  });

  const createPatient = async (values) => {
    setLoading(true);
    setError("");

    try {
      const imageUrl = selectedProfileImage ? await cloudinaryUploadFile(selectedProfileImage) : data.user.profileImageUrl;
      await AxiosInstancence.post("user/update/profile/" + data.user._id, {
        ...values,
        profileImageUrl: imageUrl,
      });

      setLoading(false);
      navigate(-1);
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
        {userData.role === 'admin' && <Uploder selectImage={(file) => SetSelectedProfileImage(file)} />}
      </div>
      {/* select  */}

      {/* fullName */}
      <div className="w-full flex gap-4">
        <Input
          readOnly={userData.role !== 'admin'}
          value={formik.values.firstName}
          name="First name"
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

        <Input
          readOnly={userData.role !== 'admin'}
          value={formik.values.secondName}
          name="secondName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Second Name"
          color={true}
          type="text"
          errormessage={
            formik.errors.secondName &&
            formik.touched.secondName &&
            formik.errors.secondName
          }
        />
      </div>

      <div className="w-full flex flex-row-reverse items-center gap-4">
        <div className="flex w-full h-full flex-row-reverse gap-2 items-center">
          <div className="h-14 w-14 flex items-center justify-center rounded-md relative border top-4 bg-gray-100">
            <BiDollar className="text-gray-500" />
          </div>
          <Input
            readOnly={userData.role !== 'admin'}
            value={formik.values.salary}
            label="Salary"
            color={true}
            type="number"
            name={"salary"}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            errormessage={
              formik.errors.secondName &&
              formik.touched.secondName &&
              formik.errors.secondName
            }
          />
        </div>

        <div className="w-full">
          <label htmlFor="" className="text-sm pb-4">Role</label>
          <select className="w-full py-3.5 px-2  border rounded-lg" onBlur={formik.handleBlur} onChange={formik.handleChange} defaultValue={data.user.role} name="" id="">
            {usersRole.map((role) => (
              <option
                disabled={userData.role !== 'admin'}
                className="bg-red-300 w-full"
                selected={role === data.user.role}
                value={role}>{role}</option>))}
          </select>
        </div>
      </div>

      {/* phone */}
      <div className="w-full">
        <Input
          readOnly={userData.role !== 'admin'}
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
          {/* emergancy contact */}

          <div className="w-full">
            <Input
              readOnly={userData.role !== 'admin'}
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
              readOnly={userData.role !== 'admin'}
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

          <div className="">
            <Input
              readOnly={userData.role !== 'admin'}
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
              errormessage={
                formik.errors.salary &&
                formik.touched.salary &&
                formik.errors.salary
              }
            />
          </div>
        </>
      )}
      {/* submit */}
      <div className="w-full">
        {
          userData.role === 'admin' && <Button
            type="submit"
            loading={loading}
            label={"Update Profile"}
            Icon={HiOutlineCheckCircle}
          />
        }

      </div>
    </form>
  );
}

export default AgentPersonalInfo;
