import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

const PhotoGallery = () => {
  const { getUser, uploadPhotos, deleteImage } = useAuth();

  const params = useParams();

  const [user, setUser] = useState({});
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

    await deleteImage(user._id, photoToDelete);

    const loggedInUser = await getUser(params.id);
    setUser(loggedInUser);
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
    var imagesUser = {};
    if (user.images) imagesUser = user.images;
    const filesFromBackend = Object.values(imagesUser).map(imageToBlob);
    const allPhotoFiles = photoFiles.concat(filesFromBackend);

    const sortedFiles = savedPhotos.map(({ public_id }) => {
      const file = allPhotoFiles.find((file) =>
        file.name.includes(public_id.split("/").pop())
      );
      return file;
    });

    await uploadPhotos(params.id, sortedFiles);

    const loggedInUser = await getUser(params.id);
    setUser(loggedInUser);
    setSavedPhotos(
      Object.values(loggedInUser.images).map((image) => ({
        url: image.url,
        public_id: image.public_id,
      }))
    );
  };

  const imageToBlob = (image) => {
    const blob = new Blob([image.data], { type: image.type });
    return new File([blob], image.name, { type: image.type });
  };

  useEffect(() => {
    async function loadUser() {
      const loggedInUser = await getUser(params.id);
      setUser(loggedInUser);
      if (loggedInUser.images) {
        setSavedPhotos(
          Object.values(loggedInUser.images).map((image) => ({
            url: image.url,
            public_id: image.public_id,
          }))
        );
      }
    }

    loadUser();
  }, []);

  return (
    <>
      <p className="bg-lime-900 text-orange-400 text-3xl font-bold p-4 mb-4 rounded-md">
        Photo Gallery
      </p>

      <div className="border-4 border-lime-900 p-4 rounded-md ">
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="file:bg-lime-700 file:hover:bg-lime-600 file:text-lime-500 file:hover:text-lime-900 file:border-0 file:p-1 file:rounded-md bg-lime-300 text-orange-400 placeholder-orange-400 px-4 py-2 rounded-md cursor-pointer"
        />

        <button
          onClick={uploadPhotoFiles}
          className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 font-bold ml-4 px-3 py-1 rounded-md focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default PhotoGallery;
