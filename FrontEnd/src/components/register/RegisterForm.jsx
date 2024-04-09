import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";
import { Link } from "react-router-dom";

const RegisterForm = ({ onSubmit, toggleModalLogin, toggleModalRegister }) => {
  return (
    <div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={yup.object({
          username: yup.string().required("Name is required"),
          email: yup.string().required("Email is required"),
          password: yup.string().required("Password is required"),
        })}
        onSubmit={async (values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col p-4">
              <h1 className="text-lime-500 text-3xl font-bold mb-4 text-center">
                Register
              </h1>

              <label
                className="text-left text-lime-500 text-sm font-bold"
                htmlFor="username"
              >
                Username:
              </label>
              <Field
                className="bg-lime-300 text-orange-400 placeholder-orange-400 w-full px-4 py-2 mb-4 rounded-md"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="username"
              />

              <label
                className="text-left text-lime-500 text-sm font-bold"
                htmlFor="email"
              >
                Email:
              </label>
              <Field
                className="bg-lime-300 text-orange-400 placeholder-orange-400 w-full px-4 py-2 mb-4 rounded-md"
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="email"
              />
              
              <label
                className="text-left text-lime-500 text-sm font-bold"
                htmlFor="password"
              >
                Password:
              </label>
              <Field
                className="bg-lime-300 text-orange-400 placeholder-orange-400 w-full px-4 py-2 mb-4 rounded-md"
                type="password"
                name="password"
                placeholder="********"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="password"
              />
              <div className="text-center">
                <button
                  className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 font-bold px-3 py-1 rounded-md focus:outline-none focus:shadow-outline"
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

              <div className="mt-4">
                <h1 className="text-orange-400 font-bold">
                  Already have an account?{" "}
                  <Link
                    onClick={() => {
                      toggleModalRegister();
                      toggleModalLogin();
                    }}
                    className="text-lime-500 font-bold"
                  >
                    Sign In!
                  </Link>
                </h1>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
