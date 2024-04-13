import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useProfile } from "../contexts/ProfileContext.jsx";
import { useMiscellany } from "../contexts/MiscellanyContext.jsx";
import ProfileModal from "../components/profile/ProfileModal.jsx";
import UploadPhotosModal from "../components/UploadPhotosModal.jsx";

const Profile = () => {
  const { user } = useAuth();
  const { calculateAge } = useMiscellany();
  const { profilePicture } = useProfile();
  const params = useParams();
  const inputFileRef = useRef(null);
  const [age, setAge] = useState(null);
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  const [isOpenUploadPhotosModal, setIsOpenUploadPhotosModal] = useState(false);

  const toggleProfileModal = async (e) => {
    setIsOpenProfileModal(!isOpenProfileModal);
  };

  const toggleUploadPhotosModal = async (e) => {
    setIsOpenUploadPhotosModal(!isOpenUploadPhotosModal);
  };

  const photoProfile = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = async (e) => {
    profilePicture(params.id, e.target.files[0]);
  };

  async function loadAge() {
    try {
      if (user) {
        if (user._id) {
          const agePerson = await calculateAge(user._id);
          setAge(agePerson);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadAge();
  }, [user]);

  return (
    <>
      {user ? (
        <div className="border-4 border-lime-900 min-h-screen mt-16 p-4 rounded-md flex flex-col justify-center items-center gap-y-4">
          <Link
            to="/people"
            className="bg-lime-900 text-lime-500 font-bold p-3 mb-4 rounded-md"
          >
            Back
          </Link>

          <div className="bg-lime-900 rounded-md p-4 w-5/6 flex flex-col items-center justify-center gap-y-4">
            <h1 className="text-lime-400 text-3xl font-bold text-center">
              {user.username}
            </h1>

            <div className="w-5/6 relative flex flex-col items-center justify-center">
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture.url
                    : "/noProfilePhoto.png"
                }
                onClick={photoProfile}
                className="w-full rounded-full cursor-pointer"
              />

              <MdAddAPhoto
                onClick={photoProfile}
                className="absolute top-1/2 right-0 h-1/4 w-1/4 p-2 bg-lime-700 text-lime-300 rounded-full cursor-pointer hover:bg-lime-500 hover:text-lime-900"
              />

              <input
                type="file"
                name="image"
                ref={inputFileRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div className="text-center">
              {age ? (
                <h2 className="text-xl text-lime-400">
                  <span className="font-bold">{age}</span> years
                </h2>
              ) : null}

              {user.country ? (
                <h3 className="text-xl text-lime-400">
                  <span className="font-bold">From:</span> {user.country}
                </h3>
              ) : null}

              {user.gender ? (
                <h4 className="text-xl text-lime-400">
                  <span className="font-bold">Gender:</span> {user.gender}
                </h4>
              ) : null}

              {user.dietaryPreferences ? (
                <h5 className="text-xl text-lime-400">
                  <span className="font-bold">Dietary preferences:</span>{" "}
                  {user.dietaryPreferences}
                </h5>
              ) : null}
            </div>

            <div className="text-center">
              <button
                className="bg-lime-700 hover:bg-lime-500 text-lime-300 hover:text-lime-900 font-bold p-2 rounded-md"
                onClick={toggleProfileModal}
              >
                Edit profile
              </button>
            </div>
          </div>

          <div className="border-lime-900 border-4 rounded-md w-full flex flex-col items-center justify-center">
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4">
                {user.photos
                  ? Object.values(user.photos).map((photo, index) => (
                      <img
                        src={photo.url}
                        alt={`Photo ${index}`}
                        className="w-full h-full rounded-md"
                        key={index}
                      />
                    ))
                  : null}
              </div>
            </div>

            <div className="bg-lime-900 p-4 w-full text-center">
              <button
                className="bg-lime-700 hover:bg-lime-500 text-lime-300 hover:text-lime-900 font-bold p-2 rounded-md"
                onClick={toggleUploadPhotosModal}
              >
                Upload photos
              </button>
            </div>
          </div>

          <ProfileModal
            isOpen={isOpenProfileModal}
            toggleModal={toggleProfileModal}
            user={user}
          />

          <UploadPhotosModal
            isOpen={isOpenUploadPhotosModal}
            toggleModal={toggleUploadPhotosModal}
          />
        </div>
      ) : null}
    </>
  );
};

export default Profile;
