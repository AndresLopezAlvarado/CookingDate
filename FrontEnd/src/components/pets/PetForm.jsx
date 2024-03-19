import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePets } from "../../contexts/PetsContext";
import * as yup from "yup";

const PetForm = ({ onSubmit, petId }) => {
  const { getPet, pets } = usePets();

  const [pet, setPet] = useState({ name: "", age: "", breed: "", image: null });

  useEffect(() => {
    console.log("Estoy en useEffect de Form");
    console.log(pets);
    async function loadPet() {
      if (petId) {
        const pet = await getPet(petId);
        setPet(pet);
        console.log(pet);
      }
    }
    loadPet();
    console.log(pets);
  }, []);

  return (
    <div>
      <Formik
        initialValues={pet}
        validationSchema={yup.object({
          name: yup.string().required("Name is required"),
          age: yup.number().required("Age is required"),
          breed: yup.string().required("Breed is required"),
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
            <div className="flex flex-col">
              <label
                className="text-left text-white text-sm font-bold"
                htmlFor="name"
              >
                Name:
              </label>
              <Field
                className="bg-zinc-500 text-white w-full px-4 py-2 mb-4 rounded-md"
                name="name"
                placeholder="Name"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="name"
              />
              <label
                className="text-left text-white text-sm font-bold"
                htmlFor="age"
              >
                Age:
              </label>
              <Field
                className="bg-zinc-500 text-white w-full px-4 py-2 mb-4 rounded-md"
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
                className="text-left text-white text-sm font-bold"
                htmlFor="breed"
              >
                Breed:
              </label>
              <Field
                className="bg-zinc-500 text-white w-full px-4 py-2 mb-4 rounded-md"
                name="breed"
                placeholder="Breed"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="breed"
              />
              <label
                className="text-left text-white text-sm font-bold"
                htmlFor="image"
              >
                Photo:
              </label>
              <input
                type="file"
                name="image"
                className="bg-zinc-500 text-white w-full px-4 py-2 mb-4 rounded-md"
                onChange={(e) => {
                  console.log(
                    "Estoy en onChange de la carga de archivo en Form"
                  );
                  console.log(pets);
                  console.log(e.target.files[0]);
                  setFieldValue("image", e.target.files[0]);
                  console.log(pets);
                }}
              />
              <div>
                <button
                  className="bg-zinc-600 hover:bg-zinc-700 font-bold px-3 py-1 rounded-md focus:outline-none focus:shadow-outline"
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

export default PetForm;
