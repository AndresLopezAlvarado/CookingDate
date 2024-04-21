import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useProfile } from "../contexts/ProfileContext.jsx";
import { useMiscellany } from "../contexts/MiscellanyContext.jsx";
import { useToggle } from "../contexts/ToggleContext.jsx";
import ProfileModal from "../components/profile/ProfileModal.jsx";
import UploadPhotosModal from "../components/uploader/UploadPhotosModal.jsx";

const Profile = () => {
  const { user } = useAuth();
  const { profilePicture } = useProfile();
  const { calculateAge } = useMiscellany();
  const { isOpen, toggleModal } = useToggle();
  const params = useParams();
  const inputFileRef = useRef(null);
  const [age, setAge] = useState(null);
  // const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  // const [isOpenUploadPhotosModal, setIsOpenUploadPhotosModal] = useState(false);

  // const toggleProfileModal = async (e) => {
  //   console.log(e.target.textContent);
  //   setIsOpenProfileModal(!isOpenProfileModal);
  // };

  // const toggleUploadPhotosModal = async (e) => {
  //   console.log(e.target.textContent);
  //   setIsOpenUploadPhotosModal(!isOpenUploadPhotosModal);
  // };

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
        <div className="min-h-screen mt-16 flex flex-col justify-center items-center gap-y-4">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <h1 className="bg-[#FF3B30] text-[#FFCC00] text-3xl font-bold p-2 rounded-md">
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

          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="grid grid-cols-3 gap-2">
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
      ) : null}
    </>
  );
};

export default Profile;
