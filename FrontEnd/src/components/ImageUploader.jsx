import React, { useRef, useState } from "react";
import "../App.css";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;

    if (files.length == 0) return;

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name == files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          { name: files[i].name, url: URL.createObjectURL(files[i]) },
        ]);
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name == files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          { name: files[i].name, url: URL.createObjectURL(files[i]) },
        ]);
      }
    }
  }

  function uploadImages() {
    console.log({ images: images });
  }

  return (
    <div className="card">
      <div className="top">
        <p>Drag and drop image uploading</p>
      </div>

      <div
        className="drag-area"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging ? (
          <span className="select">Drop image here</span>
        ) : (
          <>
            Drag and drop image here or
            <span className="select" role="button" onClick={selectFiles}>
              Browse
            </span>
          </>
        )}

        <input
          type="file"
          name="file"
          className="file hidden"
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
        />
      </div>

      <div className="container">
        {images.map((images, index) => (
          <div className="image" key={index}>
            <span className="delete" onClick={() => deleteImage(index)}>
              X
            </span>
            <img src={images.url} alt={images.name} />
          </div>
        ))}
      </div>

      <button type="button" onClick={uploadImages}>
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
