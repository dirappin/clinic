import React from "react";
import { Button, Input } from "../components/Form.jsx";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { backendUrl } from "../components/constant.js";
import axios from "axios";
import { useState } from "react";
import userAtom from "../state/user.js";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { cn } from "../util/cn.js";

function Login() {
  const [error, setError] = useState("");
  const [__, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await login(values);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email."),
      password: Yup.string().required("password can't be empty"),
      // .matches(
      //   /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      //   "Password must contain at least one number, one uppercase letter, and one special character"
      // ),
    }),
  });

  const login = async (values) => {
    try {
      setLoading(true);
      const request = await axios.post(backendUrl + "auth/login", {
        password: values.password,
        email: values.email,
      });

      setLoading(false);
      setUser({ ...request.data.user, loggedIn: true });
      localStorage.setItem("token", request.data.access_token);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(
        error.response
          ? error.response.data.message
          : "something went wrong please try again "
      );
    }
  };

  return (
    <div className="w-full h-screen flex-colo bg-dry px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-[650px] w-full 5 p-8 rounded-2xl m-auto bg-white flex-colo"
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-48 h-16 object-contain"
        />
        <div className="flex flex-col gap-4 w-full mb-6">
          <div className="relative flex justify-end w-full">
            <Input
              label="Email"
              type="email"
              color={true}
              placeholder={"admin@gmail.com"}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
            />

            <p
              className={cn(
                "text-red-500 absolute text-right top-[5.5rem]   text-[10px] min-h-[5px]"
              )}
            >
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </p>
          </div>

          <div className="relative flex justify-end w-full">
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              type="password"
              label="Password"
              color={true}
              placeholder={"*********"}
            />

            <span
              className={cn(
                "text-red-500 text-[10px] absolute text-right top-[5.5rem]   min-h-[5px]"
              )}
            >
              {formik.errors.password &&
                formik.touched.password &&
                formik.errors.password}
            </span>
          </div>
        </div>
        <Button
          type="submit"
          loading={loading}
          label="Login"
          Icon={BiLogInCircle}
        />
        <div
          className={cn(
            "w-full h-10  duration-100 text-sm text-white text-center flex justify-center items-center bg-red-300 border-red-800 border mt-4",
            {
              " scale-[0.0]": !error,
              " scal-[1]": error,
            }
          )}
        >
          {error}
        </div>
      </form>
    </div>
  );
}

export default Login;
