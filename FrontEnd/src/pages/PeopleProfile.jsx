import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <div className="h-screen mt-16 space-y-4 rounded-md flex flex-col items-center justify-center text-center">
        {person ? (
          <>
            <div className="h-1/2 w-full">
              <PhotoCarousel photos={person.photos} />
            </div>

            <div className="h-1/2 space-y-2">
              <h1 className="bg-[#FF3B30] text-[#FFCC00] text-3xl font-bold p-2 rounded-md">
                {person.username}
                {age ? <span className="text-2xl font-bold">, {age} years</span> : null}
              </h1>

              <div className="text-center">
                {person.country ? (
                  <h3 className="text-xl">
                    <span className="font-bold">From:</span> {person.country}
                  </h3>
                ) : null}

                {person.gender ? (
                  <h4 className="text-xl">
                    <span className="font-bold">Gender:</span> {person.gender}
                  </h4>
                ) : null}

                {person.dietaryPreferences ? (
                  <h5 className="text-xl">
                    <span className="font-bold">Dietary preferences:</span>{" "}
                    {person.dietaryPreferences}
                  </h5>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default PeopleProfile;
