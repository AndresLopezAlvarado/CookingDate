import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";
import { FaFileImage } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useProfile } from "../contexts/ProfileContext.jsx";
import { useMiscellany } from "../contexts/MiscellanyContext.jsx";
import { useToggle } from "../contexts/ToggleContext.jsx";
import ProfileModal from "../components/profile/ProfileModal.jsx";
import UploadPhotosModal from "../components/uploader/UploadPhotosModal.jsx";
import Spinner from "../components/Spinner.jsx";

const Profile = () => {
  const { user } = useAuth();
  const { profilePicture } = useProfile();
  const { calculateAge } = useMiscellany();
  const { isOpen, toggleModal } = useToggle();
  const params = useParams();
  const inputFileRef = useRef(null);
  const [age, setAge] = useState(null);

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
        <div className="min-h-screen w-full mt-16 flex flex-col justify-center items-center text-center gap-y-4">
          {/* Profile */}
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl font-bold">{user.username}</h1>

            {/* Photo profile */}
            <div className="relative w-5/6 flex flex-col items-center justify-center">
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
                className="absolute top-1/2 right-0 h-1/4 w-1/4 p-2 bg-[#FF9500] hover:bg-[#FFCC00] rounded-full cursor-pointer"
              />

              <input
                type="file"
                name="image"
                ref={inputFileRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Info */}
            <div className="text-center text-xl">
              {age ? (
                <h2>
                  <span className="font-bold">{age}</span> years
                </h2>
              ) : null}

              {user.country ? (
                <h3>
                  <span className="font-bold">From:</span> {user.country}
                </h3>
              ) : null}

              {user.gender ? (
                <h4>
                  <span className="font-bold">Gender:</span> {user.gender}
                </h4>
              ) : null}

              {user.dietaryPreferences ? (
                <h5>
                  <span className="font-bold">Dietary preferences:</span>{" "}
                  {user.dietaryPreferences}
                </h5>
              ) : null}
            </div>

            {/* Edit profile button */}
            <div className="text-center">
              <button
                id="openEditProfile"
                className="bg-[#FF9500] hover:bg-[#FFCC00] font-bold p-2 rounded-md"
                onClick={toggleModal}
              >
                Edit profile
              </button>
            </div>
          </div>

          {/* Upload photos */}
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            {user.photos ? (
              <div className="grid grid-cols-3 gap-2">
                {Object.values(user.photos).map((photo, index) => (
                  <img
                    src={photo.url}
                    alt={`Photo ${index}`}
                    className="w-full h-full rounded-md"
                    key={index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center space-y-2">
                <FaFileImage className="w-48 h-48" />
                <h1>There are no photos</h1>
              </div>
            )}

            <button
              id="openUploadPhotos"
              className="bg-[#FF9500] hover:bg-[#FFCC00] font-bold p-2 rounded-md"
              onClick={toggleModal}
            >
              Upload photos
            </button>
          </div>

          <ProfileModal
            isOpen={isOpen.profile}
            toggleModal={toggleModal}
            user={user}
          />

          <UploadPhotosModal
            isOpen={isOpen.uploadPhotos}
            toggleModal={toggleModal}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Profile;
