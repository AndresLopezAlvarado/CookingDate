import { useNavigate } from "react-router-dom";
import { useMiscellany } from "../../contexts/MiscellanyContext";
import { useEffect, useState } from "react";

const PersonCard = ({ person }) => {
  const navigate = useNavigate();
  const { calculateAge } = useMiscellany();
  const [age, setAge] = useState(null);

  async function loadAge() {
    try {
      setAge(await calculateAge(person._id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadAge();
  }, []);

  return (
    <div
      className="flex justify-center"
      onClick={() => {
        navigate(`/people/${person._id}`);
      }}
    >
      <div className="bg-lime-900 hover:bg-lime-500 text-lime-500 hover:text-lime-900 w-60 h-full sm:w-full pl-8 pr-8 pt-4 pb-4 rounded-md flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">{person.username}</h1>

        <div className="mb-4">
          {person.profilePicture ? (
            <img src={person.profilePicture.url} className="rounded-md" />
          ) : (
            <img src="/noProfilePhoto.png" className="rounded-md" />
          )}
        </div>

        <h2>{age} years</h2>
        
        <h3 className="mb-4">{person.dietaryPreferences}</h3>
      </div>
    </div>
  );
};

export default PersonCard;
