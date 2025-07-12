'use client'; // if using app directory

import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';
import { postData } from '../utils/apicall';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

export default function LoginPage() {
  const router = useRouter()

  const handlelogin = async (value) => {
    try {
      const promise = postData("/users/login", value)
      toast.promise(promise, {
        pending: 'You are logging in...',
        success: 'You are logged in successfully!',
        error: "You can't be logged in.",
      });
      const response = await promise;
      if (response?.data?.token) {
          localStorage.setItem('token', response.data.token);
          router.push('/orderhistory')
      }
    } catch (error) {
      console.log("error occured while login", error);
    }
  }


  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row items-center justify-center bg-gray-200 p-4 gap-6">
      {/* Side Image */}
      <div className="relative w-full md:w-[50%] h-64 md:h-[30rem]">
        <Image
          src="/images/assests company newweb/mainbanner.png"
          alt="Banner"
          fill
          className="object-contain md:object-contain rounded-lg"
        />
      </div>

      {/* Login Form */}
      <div className="w-full md:w-[26rem] bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#de6a2a]">
          Login your Account
        </h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
            handlelogin(values)
            resetForm()
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#de6a2a] hover:bg-[#ffa264] text-white font-semibold py-2 px-4 rounded"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
