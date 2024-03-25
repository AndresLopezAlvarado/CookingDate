import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ProfileModal from "../components/profile/ProfileModal.jsx";
import { useParams } from "react-router-dom";
import ImageUploader from "../components/ImageUploader.jsx";

import PhotoGallery from "../components/PhotoGallery.jsx";

const Profile = () => {
  const { getUser } = useAuth();
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  const toggleModal = async (e) => {
    setIsOpen(!isOpen);
    const userFound = await getUser(params.id);
    setUser(userFound);
  };

  useEffect(() => {
    async function loadUser() {
      const userFound = await getUser(params.id);
      setUser(userFound);
    }
    loadUser();
  }, []);

  return (
    <>
      <p className="bg-lime-900 text-orange-400 text-3xl font-bold p-4 mb-4 rounded-md">
        Profile
      </p>

      <div className="border-4 border-lime-900 p-4 mb-4 md:flex rounded-md">
        <div className="md:flex-shrink-0">
          {user.image && (
            <img
              src={user.image.url}
              className="h-48 w-full md:w-48 rounded-md"
            />
          )}
        </div>

        <div className="p-8">
          <div className="text-lime-900 font-bold uppercase ">
            {user.username}
          </div>

          <p className="mt-2 text-lime-700">{user.age} years</p>
          <p className="mt-2 text-lime-700">{user.email}</p>

          <div className="mt-4">
            <button
              className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 text-sm font-bold px-3 py-1 rounded-md"
              onClick={toggleModal}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <PhotoGallery />

      <ProfileModal isOpen={isOpen} toggleModal={toggleModal} user={user} />
    </>
  );
};

export default Profile;
