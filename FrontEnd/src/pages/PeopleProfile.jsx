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
      <div className="border-4 min-h-screen border-lime-900 mt-16 p-4 space-y-4 rounded-md flex flex-col items-center justify-center text-center">
        {person ? (
          <>
            <div className="w-full h-2/3">
              <PhotoCarousel photos={person.photos} />
            </div>

            <div className="bg-lime-900 p-4 rounded-md">
              <h1 className=" text-lime-500 font-bold text-3xl">
                {person.username}
              </h1>
              <div className="text-center">
                {age ? (
                  <h2 className="text-xl text-lime-400">
                    <span className="font-bold">{age}</span> years
                  </h2>
                ) : null}

                {person.country ? (
                  <h3 className="text-xl text-lime-400">
                    <span className="font-bold">From:</span> {person.country}
                  </h3>
                ) : null}

                {person.gender ? (
                  <h4 className="text-xl text-lime-400">
                    <span className="font-bold">Gender:</span> {person.gender}
                  </h4>
                ) : null}

                {person.dietaryPreferences ? (
                  <h5 className="text-xl text-lime-400">
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
