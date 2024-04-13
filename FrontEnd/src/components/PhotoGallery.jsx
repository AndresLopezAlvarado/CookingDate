import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";

const PhotoGallery = ({ toggleModal }) => {
  const { user } = useAuth();
  const { uploadPhotos, deletePhoto } = useProfile();
  const params = useParams();
  const [dataUser, setDataUser] = useState(null);
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (event, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();

    const updatedPhotos = [...savedPhotos];
    const draggedPhoto = updatedPhotos[draggedIndex];
    updatedPhotos.splice(draggedIndex, 1);
    updatedPhotos.splice(targetIndex, 0, draggedPhoto);

    setSavedPhotos(updatedPhotos);
    setDraggedIndex(null);
  };

  const handleDelete = async (index, photoToDelete) => {
    const updatedPhotos = [...savedPhotos];
    const name = updatedPhotos[index].public_id.match(/profile\/(.+)/);
    updatedPhotos.splice(index, 1);
    setSavedPhotos(updatedPhotos);

    var updatedPhotoFiles = [...photoFiles];
    updatedPhotoFiles = updatedPhotoFiles.filter(
      (file) => file.name !== name[1]
    );
    setPhotoFiles(updatedPhotoFiles);

    await deletePhoto(dataUser._id, photoToDelete);

    setDataUser(user);
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const newPhotoFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newPhotoFiles.push(file);

      setSavedPhotos((prevPhotos) => [
        ...prevPhotos,
        { url: url, public_id: `profile/${file.name}` },
      ]);
    }

    setPhotoFiles((prevPhotoFiles) => [...prevPhotoFiles, ...newPhotoFiles]);
  };

  const uploadPhotoFiles = async () => {
    var photosUser = {};
    if (dataUser.photos) photosUser = dataUser.photos;
    const filePhotosUser = Object.values(photosUser).map(imageToBlob);
    const allPhotoFiles = photoFiles.concat(filePhotosUser);

    const sortedFiles = savedPhotos.map(({ public_id }) => {
      const file = allPhotoFiles.find((file) =>
        file.name.includes(public_id.split("/").pop())
      );
      return file;
    });

    await uploadPhotos(params.id, sortedFiles);

    setDataUser(user);

    if (user.photos) {
      setSavedPhotos(
        Object.values(user.photos).map((image) => ({
          url: image.url,
          public_id: image.public_id,
        }))
      );
    }
  };

  const imageToBlob = (image) => {
    const blob = new Blob([image.data], { type: image.type });
    return new File([blob], image.name, { type: image.type });
  };

  useEffect(() => {
    async function loadUser() {
      setDataUser(user);
      if (user.photos) {
        setSavedPhotos(
          Object.values(user.photos).map((photo) => ({
            url: photo.url,
            public_id: photo.public_id,
          }))
        );
      }
    }

    loadUser();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="w-5/6 flex flex-col gap-y-4">
        <h1 className="text-lime-400 text-3xl font-bold text-center">
          Photo Gallery
        </h1>

        <div className="text-center">
          <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {savedPhotos.map((photo, index) => (
              <div
                key={index}
                draggable
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index)}
                className="relative"
              >
                <img
                  src={photo.url}
                  alt={`Photo ${index}`}
                  className="w-full h-full rounded-md"
                />

                <button
                  onClick={() => {
                    handleDelete(index, photo);
                  }}
                  className="absolute top-2 right-2 bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 text-sm font-bold px-3 py-1 rounded-md"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <input
            className="w-full file:bg-lime-700 file:hover:bg-lime-600 file:text-lime-500 file:hover:text-lime-900 file:border-0 file:p-1 file:rounded-md bg-lime-300 text-orange-400 placeholder-orange-400 px-4 py-2 rounded-md cursor-pointer"
            type="file"
            multiple
            onChange={handleFileInputChange}
          />
        </div>

        <div className="text-center">
          <button
            className="bg-lime-700 hover:bg-lime-500 text-lime-300 hover:text-lime-900 font-bold p-2 rounded-md"
            onClick={() => {
              toggleModal();
              uploadPhotoFiles();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
