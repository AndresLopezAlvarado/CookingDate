import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";
import SelectDate from "../SelectDate.jsx";
import fetchCountries from "../../constants/countries.js";

const ProfileForm = ({ onSubmit, toggleModal, user }) => {
  const [userData, setUserData] = useState(user);
  const [countries, setCountries] = useState([]);

  async function loadCountries() {
    const fetchedCountries = await fetchCountries();
    fetchedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    setCountries(fetchedCountries);
  }

  const handleOnChange = (date) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      birthdate: date,
    }));
  };

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        username: userData.username,
        birthdate: userData.birthdate, // realmente no inicializa con este valor porque no estoy usando un Field sino DatePicker
        gender: userData.gender,
        country: userData.country,
        dietaryPreferences: userData.dietaryPreferences,
      }}
      validationSchema={yup.object({
        username: yup.string().required("Username is required"),
      })}
      onSubmit={async (values, actions) => {
        for (let key in values) {
          if (values[key] === undefined) {
            values[key] = null;
          }
        }

        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <div className="w-5/6 flex flex-col gap-y-4">
              <h1 className="text-3xl font-bold text-center">Edit Profile</h1>

              <div>
                <label className="font-bold" htmlFor="username">
                  Username:
                </label>

                <Field
                  className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      username: e.target.value,
                    }));
                  }}
                />

                <ErrorMessage
                  className="text-[#FFCC00] font-bold"
                  name="username"
                  component="h2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold" htmlFor="birthdate">
                  Birthdate:
                </label>

                <SelectDate
                  name="birthdate"
                  handleOnChange={handleOnChange}
                  birthdate={
                    userData.birthdate ? userData.birthdate : new Date()
                  }
                  selected={
                    userData.birthdate ? userData.birthdate : new Date()
                  }
                />
              </div>

              <div>
                <label className="font-bold" htmlFor="gender">
                  Gender:
                </label>

                <Field
                  className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
                  id="gender"
                  name="gender"
                  as="select"
                  value={userData.gender}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      gender: e.target.value,
                    }));
                  }}
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Genderfluid">Genderfluid</option>
                  <option value="Gender-neutral / Agender">
                    Gender-neutral / Agender
                  </option>
                  <option value="Intersex">Intersex</option>
                  <option value="Others">Others</option>
                </Field>
              </div>

              <div>
                <label className="font-bold" htmlFor="country">
                  Country:
                </label>

                <Field
                  className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
                  id="country"
                  name="country"
                  as="select"
                  value={userData.country}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      country: e.target.value,
                    }));
                  }}
                >
                  <option value="">Select country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </Field>
              </div>

              <div>
                <label className="font-bold" htmlFor="dietaryPreferences">
                  Dietary Preferences:
                </label>

                <Field
                  className="bg-[#FFCC00] text-[#FF3B30] placeholder-orange-400 w-full p-2 rounded-md"
                  id="dietaryPreferences"
                  name="dietaryPreferences"
                  as="select"
                  value={userData.dietaryPreferences}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      dietaryPreferences: e.target.value,
                    }));
                  }}
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
              </div>

              <div className="text-center">
                <button
                  className="bg-[#FF9500] hover:bg-[#FFCC00] font-bold p-2 rounded-md"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={toggleModal}
                  >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
