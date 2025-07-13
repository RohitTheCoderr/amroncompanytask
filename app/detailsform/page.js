"use client"; // if using app directory

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postData } from "../utils/apicall";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../../reduxStore/slices/authSlice";

const LoginSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default function Detailsform({ setIscall }) {

  const dispatch = useDispatch();


  const handleSubmit = async (value) => {
    delete value.confirmpassword;
    try {
      const promise = postData("/users/create", value);
      toast.promise(promise, {
        pending: "Form Submitting..",
        success: "Form Submitted successfully..",
        reject: "Form can't be Submitted..",
      });
      const response = await promise;
      if (response?.success) {
          dispatch(setToken(response?.data?.token));
        // localStorage.setItem("token", response?.data?.token);
        setIscall(true);
      }
    } catch (error) {
      console.log("error occurred", error);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Fill Your Details
        </h2>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* firstname */}
              <div>
                <label
                  htmlFor="text"
                  className="block font-medium text-gray-700"
                >
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {/* lastname */}
              <div>
                <label
                  htmlFor="text"
                  className="block font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/*confirm Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-gray-700"
                >
                  confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="confirmpassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#de6a2a] hover:bg-[#ffa264] text-white font-semibold py-2 px-4 rounded"
              >
                {isSubmitting ? "Submiting in..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
