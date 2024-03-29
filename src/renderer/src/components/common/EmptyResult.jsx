import React from "react";
import { PiFolderOpenThin } from "react-icons/pi";
import { Button } from "../Form";

const EmptyResult = ({ lable, close, disableButton, buttonLable }) => {
  return (
    <div className="flex flex-col items-center m-auto  justify-center py-10">
      <PiFolderOpenThin className="text-8xl mb-5 text-gray-600" />
      <h1 className="text-gray-500">{lable || "Nothing found"}</h1>
      {!disableButton && (
        <Button
          onClick={() => close()}
          className={"w-[170px] mt-4"}
          label={buttonLable ? buttonLable : "close"}
        />
      )}
    </div>
  );
};

export default EmptyResult;
