import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";
import { differenceInYears, parseISO } from "date-fns";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useProfile } from "../contexts/ProfileContext.jsx";
import ProfileModal from "../components/profile/ProfileModal.jsx";

const Profile = () => {
  const { getUser } = useAuth();
  const { profilePicture } = useProfile();
  const params = useParams();
  const inputFileRef = useRef(null);
  const [user, setUser] = useState({});
  const [age, setAge] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = async (e) => {
    setIsOpen(!isOpen);
    loadUser();
  };

  const photoProfile = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = async (e) => {
    profilePicture(params.id, e.target.files[0]);
    loadUser();
  };

  async function loadUser() {
    const userFound = await getUser(params.id);
    setUser(userFound);
    const ageUserFound = differenceInYears(new Date(), parseISO(userFound.birthdate));
    setAge(ageUserFound);
  }

  useEffect(() => {
    loadUser();
  }, [user]);

  return (
    <div className="border-4 border-lime-900 h-screen mt-12 p-4 rounded-md flex flex-col items-center">
      <div className="h-1/2 flex flex-col items-center justify-center">
        <div className="relative h-1/2">
          <img
            src={
              user.profilePicture
                ? user.profilePicture.url
                : "/noProfilePhoto.png"
            }
            onClick={photoProfile}
            className="h-full rounded-full cursor-pointer"
          />

          <MdAddAPhoto
            onClick={photoProfile}
            className="absolute top-1/2 right-0 h-1/4 w-1/4 p-1 bg-lime-900 text-lime-400 rounded-full cursor-pointer"
          />
        </div>

        <input
          type="file"
          name="image"
          ref={inputFileRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <h1 className="text-3xl text-lime-950 m-4 font-bold">{user.username}</h1>
        <h2 className="text-xl text-lime-950">{age} years</h2>
        <h3 className="text-xl text-lime-950">From: {user.country}</h3>
        <h4 className="text-xl text-lime-950">Gender: {user.gender}</h4>
        <h5 className="text-xl text-lime-950">Dietary preferences: {user.dietaryPreferences}</h5>
      </div>

      <div>
        <button
          className="bg-lime-900 hover:bg-lime-700 text-lime-400 hover:text-lime-950 font-bold p-3 rounded-md"
          onClick={toggleModal}
        >
          Edit profile
        </button>
      </div>

      <ProfileModal isOpen={isOpen} toggleModal={toggleModal} user={user} />
    </div>
  );
};

export default Profile;
