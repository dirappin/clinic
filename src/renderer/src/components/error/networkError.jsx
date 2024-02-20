import React from "react";
import { CiWifiOff } from "react-icons/ci";
import { Button } from "../Form";
import { TbFaceIdError } from "react-icons/tb";

const networkError = ({ callBack, label, loading }) => {
  return (
    <div className="w-full flex justify-center items-center flex-col py-10">
      <div className="">
        <TbFaceIdError className="text-8xl text-gray-600" />
      </div>
      <p className="text-center mt-5 text-gray-800">
        {!label
          ? "failed to load patients please try to reload the page"
          : label}
      </p>
      <Button
        loading={loading}
        onClick={() => (callBack ? callBack() : () => window.location.reload())}
        className="w-[200px] text-white mt-5"
        label={"Reload"}
      />
    </div>
  );
};

export default networkError;
