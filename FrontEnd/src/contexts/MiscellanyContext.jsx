import { createContext, useContext, useState } from "react";
import { differenceInYears, parseISO } from "date-fns";
import { usePeople } from "./PeopleContext.jsx";

const MiscellanyContext = createContext();

export const useMiscellany = () => {
  const context = useContext(MiscellanyContext);

  if (!context)
    throw new Error("useMiscellany must be used within an MiscellanyProvider");

  return context;
};

export const MiscellanyProvider = ({ children }) => {
  const { getPerson } = usePeople();

  const calculateAge = async (userId) => {
    const userFound = await getPerson(userId);
    var ageUserFound = null;

    if (userFound) {
      if (userFound.birthdate) {
        ageUserFound = differenceInYears(
          new Date(),
          parseISO(userFound.birthdate)
        );
        return ageUserFound;
      } else {
        return 0;
      }
    }
  };

  return (
    <MiscellanyContext.Provider
      value={{
        calculateAge,
      }}
    >
      {children}
    </MiscellanyContext.Provider>
  );
};

export default MiscellanyContext;
