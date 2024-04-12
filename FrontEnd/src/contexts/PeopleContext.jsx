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

  const getPeople = async () => {
    try {
      const res = await getPeopleRequest();
      setPeople(res.data);
    } catch (error) {
      console.error({
        message: "Something went wrong on getPeople",
      });
    }
  };

  const getPerson = async (userId) => {
    try {
      const res = await getPersonRequest(userId);
      return res.data;
    } catch (error) {
      console.error({
        message: "Something went wrong on getPerson",
      });
    }
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        getPeople,
        getPerson,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;
