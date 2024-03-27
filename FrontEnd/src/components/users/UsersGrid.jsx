import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { UserCard } from "./UserCard";

const UsersGrid = () => {
  const { users } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="rounded-md grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersGrid;
