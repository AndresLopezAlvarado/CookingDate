import { useEffect, useState } from "react";
import Carousel from "../components/Carousel.jsx";
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

  return <>{dateUser ? <Carousel photos={dateUser.images} /> : <Spinner />}</>;
}

export default DateProfile;
