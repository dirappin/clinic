import React from "react";
import { formatDate } from "../../util/formatDate";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";

const MedicalRecordItem = ({ item }) => {
  return (
    <div
      key={item._id}
      className="bg-dry items-start grid grid-cols-12 gap-4 rounded-xl border-[1px] border-border p-6"
    >
      <div className="col-span-12 md:col-span-2">
        <p className="text-xs text-textGray font-medium">
          {formatDate(item.createdAt)}
        </p>
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
        <p className="text-xs text-main font-light">
          <span className="font-medium ">Doctor:</span>
          <span>
            {" "}
            {item.doctorId.firstName + " " + item.doctorId.secondName}{" "}
          </span>
        </p>

        <p className="text-xs text-main gap-2 w-full  flex font-light">
          <span className="font-medium">Complains:</span>
          <span className="line-clamp-2">{item.complains}</span>
        </p>

        <p className="text-xs flex gap-2 text-main font-light">
          <span className="font-medium">Complains:</span>
          <span className="line-clamp-2">{item.complains}</span>
        </p>

        <p className="text-xs flex gap-2 text-main font-light">
          <span className="font-medium">Tete et cou:</span>
          <span className="line-clamp-2">{item.Teteetcou}</span>
        </p>

        <p className="text-xs flex gap-2 text-main font-light">
          <span className="font-medium">Thorax:</span>
          <span className="line-clamp-2">{item.Thorax}</span>
        </p>

        <p className="text-xs flex gap-2 text-main font-light">
          <span className="font-medium">Abdomen:</span>
          <span className="line-clamp-2">{item.Abdomen}</span>
        </p>

        <p className="text-xs gap-2 flex text-main font-light">
          <span className="font-medium">Appareil Locomoteur:</span>
          <span className="line-clamp-2">{item.ApparreilLocomoteur}</span>
        </p>

        <p className="text-xs gap-2 flex text-main font-light">
          <span className="font-medium">Exaen:</span>
          <span className="line-clamp-2">{item.ExaenOrl}</span>
        </p>

        <p className="text-xs gap-2 flex text-main font-light">
          <span className="font-medium">Diagnosis:</span>
          <span className="line-clamp-2">{item.Diagnosis}</span>
        </p>

        <p className="text-xs gap-2 flex text-main font-light">
          <span className="font-medium">Treatment:</span>
          <span className="line-clamp-2 flex">
            {item.Treatments.map((treatment) => `${treatment.name} ,  `)}
          </span>
        </p>

        <p className="text-xs flex gap-2 text-main font-light">
          <span className="font-medium">Prescription:</span>
          <span className="line-clamp-2 flex">
            {item.prescribeMedecin.map((medicine) => `${medicine.id.name} , `)}
          </span>
        </p>
      </div>
      
      {/* price */}
      <div className="col-span-12  md:col-span-2">
        <p className="text-xs text-subMain font-semibold">
          <span className="font-light text-main">(USD)</span> {89}
        </p>
      </div>

      {/* actions */}
      <div className="col-span-12 md:col-span-2 flex-rows gap-2">
        <button
          onClick={() => {}}
          className="text-sm flex-colo bg-white text-subMain border border-border rounded-md w-2/4 md:w-10 h-10"
        >
          <FiEye />
        </button>
        <button
          onClick={() => {
            toast.error("This feature is not available yet");
          }}
          className="text-sm flex-colo bg-white text-red-600 border border-border rounded-md w-2/4 md:w-10 h-10"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default MedicalRecordItem;
