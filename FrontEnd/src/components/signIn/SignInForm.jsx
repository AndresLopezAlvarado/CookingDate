import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../contexts/AuthContext";

const SignInForm = ({ toggleModal }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const signInSchema = yup.object({
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be a least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (data) => {
    try {
      await signIn(data);
      toggleModal();
      navigate("/people");
    } catch (error) {
      toast({
        position: "top",
        duration: 4000,
        render: () => (
          <div className="bg-[#FFCC00] font-bold p-4 rounded-md text-center">
            <h1>An error has occurred!:</h1>
            <p>{error.response.data.message}</p>
          </div>
        ),
      });

      // console.error({
      //   message: "Something went wrong on signIn",
      //   errorMessage: error.message,
      //   errorName: error.name,
      //   errorCode: error.code,
      //   errorResponseDataMessage: error.response.data.message,
      //   error: error,
      // });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ email: "", password: "" }}
      validationSchema={signInSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="flex justify-center items-center">
            <div className="w-5/6 flex flex-col gap-y-4">
              <h1 className="text-3xl font-bold text-center">Sign In</h1>

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
                    "Sign In"
                  )}
                </button>
              </div>

              <div className="text-center">
                <h3 className="font-bold">
                  Don't have an account?{" "}
                  <Link
                    id="openSignUp"
                    onClick={toggleModal}
                    className="text-[#FFCC00] font-bold"
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

export default SignInForm;
