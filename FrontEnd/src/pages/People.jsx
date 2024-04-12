import React, { useEffect, useState } from "react";
import { VscEmptyWindow } from "react-icons/vsc";
import PeopleGrid from "../components/users/PeopleGrid.jsx";
import { usePeople } from "../contexts/PeopleContext.jsx";

const People = () => {
  const { people, getPeople } = usePeople();
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="mt-16">
      <div className="bg-lime-900 p-4 rounded-md w-full flex items-center justify-between">
        <div className="flex justify-center items-center gap-x-2">
          <h1 className="text-lime-500 text-sm font-bold">View:</h1>

          <button
            className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 text-sm px-3 py-1 rounded-md"
            onClick={() => setShowType("card")}
          >
            Card
          </button>

          <button
            className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 text-sm px-3 py-1 rounded-md"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
        </div>
      </div>

      <div className="border-4 border-lime-900 w-full p-4 mt-4 rounded-md">
        {people ? (
          people.length === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <VscEmptyWindow className="w-48 h-48" />
              <h1>There are no people</h1>
            </div>
          ) : showType === "table" ? (
            <></>
          ) : (
            <PeopleGrid people={people} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default People;
