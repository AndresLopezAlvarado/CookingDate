import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";
import SelectDate from "../SelectDate.jsx";
import fetchCountries from "../../constants/countries.js";

const ProfileForm = ({ onSubmit, user }) => {
  const [gender, setGender] = useState(user.gender || "");
  const [dietaryPreferences, setDietaryPreferences] = useState(
    user.dietaryPreferences || ""
  );
  const [country, setCountry] = useState(user.country || "");
  const [countries, setCountries] = useState([]);

  async function loadCountries() {
    const fetchedCountries = await fetchCountries();
    fetchedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    setCountries(fetchedCountries);
  }

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <Formik
      initialValues={{
        username: user.username,
        age: user.age,
        email: user.email,
        country: country,
        gender: gender,
        dietaryPreferences: dietaryPreferences,
        date: new Date(),
      }}
      validationSchema={yup.object({
        username: yup.string().required("Name is required"),
        age: yup.number().required("Age is required"),
        email: yup.string().required("Email is required"),
        gender: yup.string().required("Gender is required"),
        country: yup.string().required("Country is required"),
      })}
      onSubmit={async (values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
      enableReinitialize
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <h1 className="text-lime-500 text-3xl font-bold">Edit Profile</h1>

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
              htmlFor="date"
            >
              Fecha:
            </label>
            <SelectDate />

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
              htmlFor="gender"
            >
              Gender:
            </label>
            <Field
              as="select"
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="bg-lime-300 text-orange-400 placeholder-orange-400 w-full px-4 py-2 mb-4 rounded-md"
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Others">Others</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="p"
              className="text-red-400 text-sm"
            />

            <label
              className="text-left text-lime-500 text-sm font-bold"
              htmlFor="dietaryPreferences"
            >
              Dietary Preferences:
            </label>
            <Field
              as="select"
              id="dietaryPreferences"
              name="dietaryPreferences"
              value={dietaryPreferences}
              onChange={(e) => setDietaryPreferences(e.target.value)}
              className="bg-lime-300 text-orange-400 placeholder-orange-400 w-full px-4 py-2 mb-4 rounded-md"
            >
              <option value="">Select dietary preferences</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-free">Gluten-free</option>
              <option value="Lactose intolerant">Lactose intolerant</option>
              <option value="Nut allergy">Nut allergy</option>
              <option value="Seafood allergy">Seafood allergy</option>
              <option value="Pescetarian">Pescetarian</option>
              <option value="Kosher">Kosher</option>
              <option value="Halal">Halal</option>
            </Field>
            <ErrorMessage
              name="dietaryPreferences"
              component="p"
              className="text-red-400 text-sm"
            />

            <label
              className="text-left text-lime-500 text-sm font-bold"
              htmlFor="country"
            >
              Country:
            </label>
            <Field
              as="select"
              id="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-lime-300 text-orange-400 placeholder-orange-400 w-full px-4 py-2 mb-4 rounded-md"
            >
              <option value="">Select country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="country"
              component="p"
              className="text-red-400 text-sm"
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
  );
};

export default ProfileForm;
