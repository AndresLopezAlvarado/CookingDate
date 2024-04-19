import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      className="ring-[#FF3B30] hover:ring-4 text-black hover:text-opacity-70 flex flex-col items-center justify-end font-bold h-64 bg-cover bg-center rounded-md cursor-pointer"
      style={
        person.profilePicture
          ? { backgroundImage: `url(${person.profilePicture.url})` }
          : { backgroundImage: `url("/noProfilePhoto.png")` }
      }
      onClick={() => {
        navigate(`/people/${person._id}`);
      }}
    >
      <h1 className="bg-[#FF3B30] text-center text-xl px-2 m-1 rounded-md">
        {firstName}
      </h1>
    </div>
  );
};

export default PersonCard;
