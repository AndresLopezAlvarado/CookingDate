import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePeople } from "../contexts/PeopleContext.jsx";
import { useMiscellany } from "../contexts/MiscellanyContext.jsx";
import PhotoCarousel from "../components/PhotoCarousel.jsx";

function PeopleProfile() {
  const { getPerson } = usePeople();
  const { calculateAge } = useMiscellany();
  const params = useParams();
  const [person, setPerson] = useState(null);
  const [age, setAge] = useState(null);

  async function loadPerson() {
    try {
      const dataPerson = await getPerson(params.id);
      setPerson(dataPerson);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadAge() {
    try {
      if (person) {
        const agePerson = await calculateAge(person._id);
        setAge(agePerson);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPerson();
    loadAge();
  }, [person]);

  return (
    <>
      <div className="border-4 min-h-screen border-lime-900 mt-16 p-4 rounded-md flex flex-col items-center justify-center text-center">
        <Link
          to="/people"
          className="bg-lime-900 text-lime-500 font-bold p-3 mb-4 rounded-md"
        >
          Back
        </Link>

        {person ? (
          <>
            <PhotoCarousel photos={person.photos} />

            <h1 className="bg-lime-900 text-lime-500 text-3xl font-bold p-4 mb-4 rounded-md">
              {person.username}
            </h1>

            <div>
              <h1 className="text-lime-900 font-bold text-2xl">
                {age} years
              </h1>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default PeopleProfile;
