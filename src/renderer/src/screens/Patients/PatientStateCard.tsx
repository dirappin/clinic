import React from "react";
import { cn } from "../../util/cn";

const PatientStateCard = ({
  patient,
  title,
  valueCount,
  titleDescription,
  Icon,
  iconColor,
}) => {
  return (
    <div
      key={patient._id}
      className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
    >
      <div className="w-3/4">
        <h2 className="text-sm font-medium">{title}</h2>
        <h2 className="text-xl my-6 font-medium">{valueCount}</h2>
        <p className="text-xs text-textGray">
          {titleDescription} <span>{valueCount}</span>
        </p>
      </div>
      <div
        className={cn(
          "w-10 h-10 flex-colo rounded-md text-white text-md",
          iconColor
        )}
      >
        <Icon />
      </div>
    </div>
  );
};

export default PatientStateCard;
