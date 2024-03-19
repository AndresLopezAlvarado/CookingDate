import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePets } from "../contexts/PetsContext";
import Map from "../components/Map.jsx";
import Spinner from "../components/Spinner.jsx";

const FindPet = () => {
  const { id } = useParams();
  const { getPet } = usePets();
  const [pet, setPet] = useState({});
  const [location, setLocation] = useState(null);

  useEffect(() => {
    async function loadPet() {
      if (id) {
        const pet = await getPet(id);
        setPet(pet);
      }
    }
    loadPet();

    if (!navigator.geolocation)
      console.error("La geolocalización no es compatible con este navegador.");
  }, []);

  const fakePosition = () => {
    var latitude = Math.random() * 180 - 90;
    var longitude = Math.random() * 360 - 180;
    setLocation({ latitude, longitude });
  };

  return (
    <div className="p-4 rounded-md h-full flex items-center justify-center">
      {/* <div className="bg-zinc-400 p-4 rounded-md h-full flex items-center justify-center"> */}
      <button
        onClick={() => fakePosition()}
        className="bg-zinc-900 hover:bg-zinc-700 text-white hover:text-black font-bold h-full flex flex-col items-center justify-center text-center p-4 mr-4 rounded-md"
      >
        {pet.image && (
          <img src={pet.image.url} className="h-20 w-20 mb-3 rounded-full" />
        )}
        Find {pet.name}
        {/* <h1 className="text-white hover:text-zinc-900 font-bold mt-4">Find {pet.name}</h1> */}
      </button>

      <div className="bg-zinc-400 h-full flex flex-col items-center justify-center text-center p-2 rounded-md">
        {location ? (
          <Map
            latitude={location.latitude}
            longitude={location.longitude}
            pet={pet}
          />
        ) : (
          <>
            <p className="ml-4 mt-4 mr-4">
              Waiting for position (click on your pet's card)
            </p>
            <Spinner></Spinner>
          </>
        )}
      </div>
    </div>
  );
};

export default FindPet;
