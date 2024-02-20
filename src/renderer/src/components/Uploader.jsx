import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { FiUploadCloud } from "react-icons/fi";

const Uploader = ({ setImage, image, selectImage }) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const imagePreviwer = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      selectImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <>
      <div className="w-full text-center grid grid-cols-12 gap-4">
        <div
          onClick={handleButtonClick}
          className="px-6 lg:col-span-10 sm:col-span-8 col-span-12 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer"
        >
          <span className="mx-auto flex justify-center">
            <FiUploadCloud className="text-3xl text-subMain" />
          </span>
          <p className="text-sm mt-2">Drag your image here</p>
          <em className="text-xs text-gray-400">
            (Only *.jpeg and *.png images will be accepted)
          </em>
        </div>

        {/* image preview */}
        <div className="lg:col-span-2 sm:col-span-4 relative col-span-12 overflow-hidden rounded-ld">
          {loading ? (
            <div className="px-6 w-full bg-dry flex-colo h-32 border-2 border-border border-dashed rounded-md">
              <BiLoaderCircle className="mx-auto text-main text-3xl animate-spin" />
              <span className="text-sm mt-2 text-text">Uploading...</span>
            </div>
          ) : (
            <img
              src={image ? image : "http://placehold.it/300x300"}
              alt="preview"
              className=" w-full h-32 rounded object-cover"
            />
          )}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="absolute top-0 object-cover w-full h-full"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
      </div>
      <input
        onChange={handleImageChange}
        hidden
        ref={fileInputRef}
        accept="image/*"
        type="file"
      />
    </>
  );
};

export default Uploader;
