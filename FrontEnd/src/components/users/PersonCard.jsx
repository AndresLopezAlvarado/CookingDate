import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const PersonCard = ({ person }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);

  const splitUsername = () => {
    const usernameParts = person.username.split(" ");
    const firstPart = usernameParts[0];
    setFirstName(firstPart);
  };

  useEffect(() => {
    splitUsername();
  }, []);

  return (
    <div
      className="text-lime-950 hover:text-lime-700 flex flex-col items-center justify-end font-bold h-64 bg-cover bg-center rounded-md cursor-pointer hover:ring-4 ring-lime-900"
      style={
        person.profilePicture
          ? { backgroundImage: `url(${person.profilePicture.url})` }
          : { backgroundImage: `url("/noProfilePhoto.png")` }
      }
      onClick={() => {
        navigate(`/people/${person._id}`);
      }}
    >
      <h1 className="bg-lime-500 text-center text-2xl p-1 m-1 rounded-md">
        {firstName}
      </h1>
    </div>
  );
};

export default PersonCard;
