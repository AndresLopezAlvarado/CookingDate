import React from "react";
import { useNavigate } from "react-router-dom";

export const UserCard = ({ user }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div
        onClick={() => {
          navigate(`/people/${user._id}`);
        }}
      >
        <div className="bg-lime-900 hover:bg-lime-500 text-lime-500 hover:text-lime-900 max-w-md w-full pl-8 pr-8 pt-4 pb-4 rounded-md h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-4">{user.username}</h1>

          <div className="mb-4">
            {user.image && <img src={user.image.url} className="rounded-md" />}
          </div>

          <p className="">{user.age} years</p>
          <p className="mb-4">{user.email}</p>
        </div>
      </div>
    </>
  );
};
