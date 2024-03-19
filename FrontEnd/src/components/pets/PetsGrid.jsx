import { useState } from "react";
import Spinner from "../Spinner.jsx";
import PetCard from "../../components/pets/PetCard.jsx";
import { usePets } from "../../contexts/PetsContext.jsx";

const PetsGrid = () => {
  const { pets } = usePets();
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="rounded-md grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {pets.map((pet) => (
            <PetCard pet={pet} key={pet._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetsGrid;
