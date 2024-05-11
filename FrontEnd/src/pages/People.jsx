import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VscEmptyWindow } from "react-icons/vsc";
import { TiMessages } from "react-icons/ti";
import PeopleGrid from "../components/users/PeopleGrid.jsx";
import { usePeople } from "../contexts/PeopleContext.jsx";

const People = () => {
  const { people, getPeople } = usePeople();
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="mt-16 flex flex-col space-y-2">
      <div className="bg-[#FF3B30] p-2 rounded-md w-full flex items-center justify-between">
        <div className="flex justify-center items-center gap-x-2">
          <h1 className="font-bold">View:</h1>

          <button
            className="bg-[#FF9500] hover:bg-[#FFCC00] p-2 rounded-md"
            onClick={() => setShowType("card")}
          >
            Card
          </button>

          <button
            className="bg-[#FF9500] hover:bg-[#FFCC00] p-2 rounded-md"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
        </div>

        <Link to="/chats">
          <TiMessages className="text-3xl" />
        </Link>
      </div>

      <div className="w-full">
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
