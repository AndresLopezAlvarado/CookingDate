import { useEffect, useState } from "react";
import PhotoCarousel from "../components/PhotoCarousel.jsx";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

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
      <div className="min-h-screen border-4 border-lime-900 mt-14 sm:mt-16 md:mt-20 lg:mt-28 mx-1 mb-1 p-4 rounded-md flex flex-col items-center justify-center text-center">
      </div>{dateUser ? <PhotoCarousel photos={dateUser.images} /> : <Spinner />}</>
  );
}

export default DateProfile;
