import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as yup from "yup";

const RegisterForm = ({ onSubmit, toggleModalLogin, toggleModalRegister }) => {
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
              <h1 className="text-lime-400 text-3xl font-bold text-center">
                Register
              </h1>

              <div>
                <label className="text-lime-400 font-bold" htmlFor="username">
                  Username:
                </label>

                <Field
                  className="bg-lime-300 text-orange-500 placeholder-orange-400 w-full p-2 rounded-md"
                  name="username"
                  placeholder="Username"
                />

                <ErrorMessage
                  className="text-red-400"
                  name="username"
                  component="h2"
                />
              </div>

              <div>
                <label className="text-lime-400 font-bold" htmlFor="email">
                  Email:
                </label>

                <Field
                  className="bg-lime-300 text-orange-500 placeholder-orange-400 w-full p-2 rounded-md"
                  type="email"
                  name="email"
                  placeholder="Email"
                />

                <ErrorMessage
                  className="text-red-400"
                  name="email"
                  component="h2"
                />
              </div>

              <div>
                <label className="text-lime-400 font-bold" htmlFor="password">
                  Password:
                </label>

                <Field
                  className="bg-lime-300 text-orange-500 placeholder-orange-400 w-full p-2 rounded-md"
                  type="password"
                  name="password"
                  placeholder="********"
                />

                <ErrorMessage
                  className="text-red-400"
                  name="password"
                  component="h2"
                />
              </div>

              <div className="text-center">
                <button
                  className="bg-lime-700 hover:bg-lime-500 text-lime-300 hover:text-lime-900 font-bold p-2 rounded-md"
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
                <h3 className="text-lime-400 font-bold">
                  Already have an account?{" "}
                  <Link
                    onClick={() => {
                      toggleModalRegister();
                      toggleModalLogin();
                    }}
                    className="text-orange-400 font-bold"
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
