import React, { useCallback, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";

const FilesUploader = ({ selectImage }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedFiles([...files]);
    selectImage && selectImage([...files]);
  };

  const deleteFile = (file) => {
    const previousState = [...selectedFiles].filter(
      (fl) => fl.name !== file.name
    );
    setSelectedFiles([...previousState]);
    selectImage && selectImage([...previousState]);
  };

  return (
    <>
      <div className="w-full  text-center grid grid-cols-12 gap-4">
        <div
          onClick={handleButtonClick}
          className="col-span-12 w-full   pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer"
        >
          <span className="mx-auto flex justify-center">
            <FiUploadCloud className="text-3xl text-subMain " />
          </span>
          <p className="text-sm mt-2">click to upload</p>
          <em className="text-xs text-gray-400">
            (Only *.jpeg and *.png images will be accepted)
          </em>
        </div>

        {/* image preview */}
      </div>

      <input
        onChange={handleImageChange}
        hidden
        ref={fileInputRef}
        accept="image/*"
        type="file"
        multiple
      />

      <div className="flex gap-5  flex-wrap">
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="flex relative  w-32 h-32 bg-gray-300 rounded-lg p-2"
          >
            <img
              className="object-contain w-full h-full"
              src={URL.createObjectURL(file)}
            />
            <button
              onClick={(e, index) => {
                e.preventDefault();
                deleteFile(file);
              }}
              className="w-5 flex justify-center items-center  absolute right-[-5px] top-[-5px] h-5 text-red-500 bg-gray-500 rounded-full"
            >
              <GrFormClose />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilesUploader;
