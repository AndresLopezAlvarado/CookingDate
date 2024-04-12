import { createContext, useContext, useState } from "react";
import { getPeopleRequest, getUserRequest } from "../api/people.js";

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

  const getUser = async (userId) => {
    try {
      const res = await getUserRequest(userId);
      return res.data;
    } catch (error) {
      console.error({
        message: "Something went wrong on getUser",
      });
    }
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        getPeople,
        getUser,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;
