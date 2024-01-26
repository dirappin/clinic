import React, { useRef, useState } from "react";
import Modal from "../../components/Modals/Modal";
import { Button, Input, Select } from "../../components/Form";
import { BiChevronDown } from "react-icons/bi";
import { sortsDatas } from "../../components/Datas";
import { HiOutlineCheckCircle } from "react-icons/hi";
import AxiosInstance from "../../ axiosInstance";
import { toast } from "react-hot-toast";
import Uploader from "../../components/Uploader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cloudinaryUploadFile } from "../../util/cloudinary";
import { useNavigate } from "react-router-dom";
import { usersRole } from "../../constant";




function AddAgentsModal({ closeModal, isOpen, doctor, datas }) {
  const profileImage = useRef(null);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      firstName: "",
      secondName: "",
      salary: 10,
      role: "doctor",
      phoneNumber: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      salary: Yup.number().required("Salary can't be empty"),
      firstName: Yup.string().required("First name is required"),
      secondName: Yup.string().required("Second name is required"),
      role: Yup.string().required("Role can't be empty"),
      phoneNumber: Yup.string().required("Must provide phone number"),
      password: Yup.string()
        .required("Password is required")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        ),
      email: Yup.string().required("Email is required").email().required("Incorrect Email")
    }),
    onSubmit: async (values) => await createUser(values),
  });

  const createUser = async (values) => {
    setIsloading(true);
    if (!profileImage.current) return toast.error("profile image required");

    try {
      const uploadProfile = await cloudinaryUploadFile(profileImage.current);
      await AxiosInstance.post("user/create", {
        firstName: values.firstName,
        password: values.password,
        phoneNumber: values.phoneNumber,
        role: values.role,
        salary: values.salary,
        secondName: values.secondName,
        profileImageUrl: uploadProfile,
        email: values.email
      });

      toast.success('agent  create');
      navigate('/agents');
      setIsloading(false)
      closeModal();
    } catch (error) {
      setIsloading(false);
      toast.error(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "something went wrong"
      );
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={doctor ? "Add Doctor" : datas?.id ? "Edit Stuff" : "Add Stuff"}
      width={"max-w-3xl"}
    >
      <div className="flex gap-3 flex-col col-span-6 mb-6">
        <p className="text-sm">Profile Image</p>
        <Uploader selectImage={(image) => (profileImage.current = image)} />
      </div>

      <form onSubmit={formik.handleSubmit} className="flex-colo gap-6">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            name={"firstName"}
            errormessage={
              formik.errors.firstName &&
              formik.touched.firstName &&
              formik.errors.firstName
            }
            defaulValue={formik.values.firstName}
            required={true}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="First Name"
            color={true}
            placeholder="John Doe..."
          />
          <Input
            name={"secondName"}
            errormessage={
              formik.errors.secondName &&
              formik.touched.secondName &&
              formik.errors.secondName
            }
            defaulValue={formik.values.secondName}
            required={true}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Second Name"
            color={true}
            placeholder="John Doe..."
          />
        </div>

        <Input
          type={'email'}
          name={"email"}
          errormessage={
            formik.errors.email &&
            formik.touched.email &&
            formik.errors.email
          }
          defaulValue={formik.values.email}
          required={true}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Agent Email"
          color={true}
          placeholder="eg:test@gmail.com" />

        <div className="w-full">
          <div className="">
            <label htmlFor="role" className="text-sm mb-3">Role</label>
            <select className="w-full text-sm p-3 border rounded-md" name="role" defaultValue={formik.values.role} id="">
              {usersRole.map((role) => (<option className="text-sm" value={role}>{role}</option>))}
            </select>
          </div>
        </div>


        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            required={true}
            errormessage={
              formik.errors.salary &&
              formik.touched.salary &&
              formik.errors.salary
            }
            type={"number"}
            name={"salary"}
            id="salary"
            defaulValue={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Salary"
            color={true}
          />
          <Input
            name={"phoneNumber"}
            errormessage={
              formik.errors.phoneNumber &&
              formik.touched.phoneNumber &&
              formik.errors.phoneNumber
            }
            defaulValue={formik.values.phoneNumber}
            required={true}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Phone Number"
            color={true}
          />
        </div>

        <div className="w-full">
          <Input
          type={'password'}
            name={"password"}
            errormessage={
              formik.errors.password &&
              formik.touched.password &&
              formik.errors.password
            }
            defaulValue={formik.values.password}
            required={true}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Password"
            color={true}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            type="button"
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            Cancel
          </button>
          <Button
            loading={isLoading}
            label="Create Agent"
            Icon={HiOutlineCheckCircle}
            type="submit"
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddAgentsModal;
