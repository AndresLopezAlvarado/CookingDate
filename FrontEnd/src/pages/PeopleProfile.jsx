import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { PiKnifeFill } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { usePeople } from "../contexts/PeopleContext.jsx";
import { useToggle } from "../contexts/ToggleContext";
import { useMiscellany } from "../contexts/MiscellanyContext.jsx";
import PhotoCarousel from "../components/PhotoCarousel.jsx";
import ChatModal from "../components/chat/ChatModal.jsx";

function PeopleProfile() {
  const { getPerson } = usePeople();
  const { isOpen, toggleModal } = useToggle();
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
            <div className="h-1/2 w-full border-[#FF3B30] border p-1 rounded-md">
              {person.photos ? (
                <PhotoCarousel photos={person.photos} />
              ) : (
                <div className="h-full flex">
                  <img className="rounded-full" src="/noProfilePhoto.png" />
                </div>
              )}
            </div>

            <div className="h-1/2 space-y-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold">
                  {person.username}
                  {age ? <span>, {age} years</span> : null}
                </h1>

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

              <div className="bg-[#FF3B30] font-bold p-2 rounded-md flex text-4xl space-x-8 justify-center items-center text-center">
                <Link className="bg-[#FF9500] hover:bg-[#FFCC00] focus:ring-white focus:outline-none focus:ring-2 focus:ring-inset font-bold p-2 rounded-md">
                  <ImSpoonKnife />
                </Link>

                <Link className="bg-[#FF9500] hover:bg-[#FFCC00] focus:ring-white focus:outline-none focus:ring-2 focus:ring-inset font-bold p-2 rounded-md">
                  <IoFastFoodOutline />
                </Link>

                <Link className="bg-[#FF9500] hover:bg-[#FFCC00] focus:ring-white focus:outline-none focus:ring-2 focus:ring-inset font-bold p-2 rounded-md">
                  <PiKnifeFill />
                </Link>

                <Link
                  id="openChat"
                  onClick={toggleModal}
                  className="bg-[#FF9500] hover:bg-[#FFCC00] focus:ring-white focus:outline-none focus:ring-2 focus:ring-inset font-bold p-2 rounded-md"
                >
                  <TiMessages id="openChat" onClick={toggleModal} />
                </Link>
              </div>
            </div>

            <ChatModal
              isOpen={isOpen.chat}
              toggleModal={toggleModal}
              person={person}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export default PeopleProfile;
