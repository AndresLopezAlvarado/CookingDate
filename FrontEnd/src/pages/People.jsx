import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { VscEmptyWindow } from "react-icons/vsc";
import UsersGrid from "../components/users/UsersGrid.jsx";
import UsersTable from "../components/users/UsersTable.jsx";
import Spinner from "../components/Spinner";

const People = () => {
  const { getUsers, users } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  const columns = [
    { header: "ID", accessorKey: "_id" },
    { header: "Username", accessorKey: "username" },
    { header: "Age", accessorKey: "age" },
    { header: "Email", accessorKey: "email" },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
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
        {users.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <VscEmptyWindow className="w-48 h-48" />
            <h1>There are no users</h1>
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <UsersTable data={users} columns={columns} />
        ) : (
          <UsersGrid />
        )}
      </div>
    </>
  );
};

export default People;
