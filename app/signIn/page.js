"use client"; // if using app directory

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postData } from "../utils/apicall";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken } from "../../reduxStore/slices/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastname: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required(" Last name is required"),
  email: Yup.string().email("Invalid email").required(" Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Detailsform({ setIscall }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (value) => {
    delete value.confirmpassword;
    try {
      const promise = postData("/users/create", value);
      toast.promise(promise, {
        pending: "Form Submitting..",
        success: "User created successfully..",
        reject: "User can't be created...",
      });
      const response = await promise;

      if (response?.success) {
        dispatch(setToken(response?.data?.token));
        setIscall(true);
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/"); // fallback
        }
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Form can't be submitted..";
      toast.error(msg);
      console.log("error occurred", error);
    }
  };

  return (
    // <div className=" flex items-center justify-center bg-gray-100 p-4">
    <div className="min-h-[85vh] flex flex-col md:flex-row items-center justify-center bg-gray-200 p-4 gap-6">
      {/* Side Image */}
      <div className="hidden md:flex relative w-full md:w-[50%] h-64 md:h-[30rem]">
        <Image
          src="/images/assests company newweb/mainbanner.png"
          alt="Banner"
          fill
          className="object-contain md:object-contain rounded-lg"
        />
      </div>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-[#de6a2a]">
            Create an Account
          </h2>
          <p className="text-center text-sm text-[#898989]">
            Get started by filling in your details
          </p>
        </div>
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
              <div className="flex justify-between gap-1.5 ">
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
                    placeholder="Enter first name"
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
                    placeholder="Enter last name"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
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
                  placeholder="Enter email password"
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
                  placeholder="Enter password"
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
                  placeholder="Confirm password"
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
                className="w-full bg-[#de6a2a] hover:bg-[#ffa264] text-white cursor-pointer font-semibold py-2 px-4 rounded"
              >
                {isSubmitting ? "Submiting in..." : "Submit"}
              </button>
              <div className="w-full text-right">
                <Link
                  href={"/login"}
                  className="text-black hover:text-blue-600 text-sm "
                >
                  {" "}
                  I have already an account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
