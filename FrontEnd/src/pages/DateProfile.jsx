import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PhotoCarousel from "../components/PhotoCarousel.jsx";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";

function DateProfile() {
  const { getUser } = useAuth();
  const params = useParams();
  const [dateUser, setDateUser] = useState({});

  useEffect(() => {
    async function loadDateUser() {
      const dateProfile = await getUser(params.id);
      setDateUser(dateProfile);
    }

    loadDateUser();
  }, []);

  return (
    <>
      <div className="border-4 min-h-screen border-lime-900 mt-14 sm:mt-16 md:mt-20 lg:mt-28 mx-1 mb-1 p-4 rounded-md flex flex-col items-center justify-center text-center">
        {dateUser ? (
          <>
            <Link
              to="/people"
              className="bg-lime-900 text-lime-500 font-bold p-3 mb-4 rounded-md"
            >
              Back
            </Link>

            <h1 className="bg-lime-900 text-lime-500 text-3xl font-bold p-4 mb-4 rounded-md">
              {dateUser.username}
            </h1>

            <PhotoCarousel photos={dateUser.images} />

            <div>
              <h1 className="text-lime-900 font-bold text-2xl">
                {dateUser.age} years
              </h1>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}

export default DateProfile;
