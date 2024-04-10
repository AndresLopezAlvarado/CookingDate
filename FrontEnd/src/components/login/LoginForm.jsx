import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as yup from "yup";

const LoginForm = ({ onSubmit, toggleModalLogin, toggleModalRegister }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{ email: "", password: "" }}
      validationSchema={yup.object({
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
                Login
              </h1>

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
                    "Sign In"
                  )}
                </button>
              </div>

              <div className="text-center">
                <h3 className="text-lime-400 font-bold">
                  Don't have an account?{" "}
                  <Link
                    onClick={() => {
                      toggleModalLogin();
                      toggleModalRegister();
                    }}
                    className="text-orange-400 font-bold"
                  >
                    Sign Up!
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

export default LoginForm;
