import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as yup from "yup";

const RegisterForm = ({ onSubmit, toggleModal }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={yup.object({
        username: yup.string().required("Username is required"),
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
      })}
      onSubmit={async (values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <div className="w-5/6 flex flex-col gap-y-4">
              <h1 className="text-3xl font-bold text-center">Register</h1>

              <div>
                <label className="font-bold" htmlFor="username">
                  Username:
                </label>

                <Field
                  className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
                  name="username"
                  placeholder="Username"
                />

                <ErrorMessage
                  className="text-[#FFCC00] font-bold"
                  name="username"
                  component="h2"
                />
              </div>

              <div>
                <label className="font-bold" htmlFor="email">
                  Email:
                </label>

                <Field
                  className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
                  type="email"
                  name="email"
                  placeholder="Email"
                />

                <ErrorMessage
                  className="text-[#FFCC00] font-bold"
                  name="email"
                  component="h2"
                />
              </div>

              <div>
                <label className="font-bold" htmlFor="password">
                  Password:
                </label>

                <Field
                  className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
                  type="password"
                  name="password"
                  placeholder="********"
                />

                <ErrorMessage
                  className="text-[#FFCC00] font-bold"
                  name="password"
                  component="h2"
                />
              </div>

              <div className="text-center">
                <button
                  className="bg-[#FF9500] hover:bg-[#FFCC00] font-bold p-2 rounded-md"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              <div className="text-center">
                <h3 className="font-bold">
                  Already have an account?{" "}
                  <Link
                    id="openSignIn"
                    onClick={toggleModal}
                    className="text-[#FFCC00] font-bold"
                  >
                    Sign In!
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
