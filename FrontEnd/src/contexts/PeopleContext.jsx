import { createContext, useContext, useState } from "react";
import { getPeopleRequest, getPersonRequest } from "../api/people.js";

const PeopleContext = createContext();

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context)
    throw new Error("usePeople must be used within an PeopleProvider");

  return context;
};

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState(null);
  const [person, setPerson] = useState(null);

  const getPeople = async () => {
    try {
      const res = await getPeopleRequest();
      setPeople(res.data);
    } catch (error) {
      console.error({
        message: "Something went wrong on getPeople",
      });

      throw new Error(error);
    }
  };

  const getPerson = async (personId) => {
    try {
      const res = await getPersonRequest(personId);
      setPerson(res.data);
      // return person.data;
    } catch (error) {
      console.error({
        message: "Something went wrong on getPerson",
      });
      
      throw new Error(error);
    }
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        person,
        getPeople,
        getPerson,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;
