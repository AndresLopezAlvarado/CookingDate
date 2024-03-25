import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";

const ProfileForm = ({ onSubmit, user }) => {
  return (
    <div>
      <Formik
        initialValues={user}
        validationSchema={yup.object({
          username: yup.string().required("Name is required"),
          age: yup.number().required("Age is required"),
          email: yup.string().required("Email is required"),
          image: yup.string().required("Photo is required"),
        })}
        onSubmit={async (values, actions) => {
          console.log("Estoy en onSubmit del Formik de Form");
          console.log(values);
          onSubmit(values);
          actions.setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col p-4">
              <h1 className="text-lime-500 text-3xl font-bold mb-4 text-center">
                Edit Profile
              </h1>

              <label
                className="text-left text-lime-500 text-sm font-bold"
                htmlFor="username"
              >
                Name:
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
                htmlFor="age"
              >
                Age:
              </label>
              <Field
                className="bg-lime-300 text-orange-400 placeholder-orange-400 w-full px-4 py-2 mb-4 rounded-md"
                type="number"
                name="age"
                placeholder="Age"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="age"
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
                htmlFor="image"
              >
                Photo:
              </label>
              <input
                type="file"
                name="image"
                className="file:bg-lime-700 file:hover:bg-lime-600 file:text-lime-500 file:hover:text-lime-900 file:border-0 file:p-1 file:rounded-md bg-lime-300 text-orange-400 placeholder-orange-400 w-full px-4 py-2 mb-4 rounded-md cursor-pointer"
                onChange={(e) => {
                  console.log(
                    "Estoy en onChange de la carga de archivo en Form"
                  );
                  console.log(e.target.files);
                  console.log(e.target.files[0]);
                  setFieldValue("image", e.target.files[0]);
                }}
              />

              <div>
                <button
                  className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 font-bold px-3 py-1 rounded-md focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
