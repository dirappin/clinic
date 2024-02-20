import React, { useState } from "react";
import Modal from "./Modal";
import { BiSearch, BiPlus } from "react-icons/bi";
import { memberData, servicesData, medicineData } from "../Datas";
import { RadioGroup } from "@headlessui/react";
import { Button } from "../Form";
import EmptyResult from "../common/EmptyResult";
import { cn } from "../../util/cn";

function PatientMedicineServiceModal({
  closeModal,
  isOpen,
  patient,
  data = [],
  selectedMedecine,
}) {
  const [searchInputValue, setSearchInpputValue] = useState("");
  const [mappedData, setMappedData] = useState(
    [...data].map((item) => ({ ...item, checked: false }))
  );

  const onChoiceChnage = (index) => {
    const prevState = [...mappedData];
    const currentActiveIndex = prevState.findIndex((item) => item.checked);
    if (currentActiveIndex === -1) {
      prevState[index].checked = true;
    } else {
      prevState[currentActiveIndex].checked = false;
      prevState[index].checked = true;
    }
    setMappedData(prevState);
    selectedMedecine(prevState[index]);
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={patient ? "Patients" : "Medicine & Services"}
      width={"max-w-xl"}
    >
      <div className="flex-colo gap-6">
        {/* search */}
        <div className="flex items-center gap-4 w-full border border-border rounded-lg p-3">
          <input
            onChange={(e) => setSearchInpputValue(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full"
          />
          <BiSearch className=" text-xl" />
        </div>

        {/* data */}
        <div className="w-full h-[500px] overflow-y-scroll">
          <div className="space-y-2 grid gap-5">
            {data.length > 0 &&
              mappedData
                .filter((item) =>
                  item.name
                    .toUpperCase()
                    .includes(searchInputValue.toUpperCase())
                )
                .map((medecine, index) => (
                  <p
                    onClick={() => onChoiceChnage(index)}
                    className={cn(
                      "px-4 py-3 text-sm cursor-pointer text-gray-600 border rounded-lg",
                      {
                        "bg-blue-500 text-white border-transparent":
                          medecine.checked,
                      }
                    )}
                    key={medecine._id}
                    value={medecine}
                  >
                    {medecine.name}
                  </p>
                ))}
          </div>

          {data.length < 1 && <EmptyResult />}
        </div>
        {/* button */}

        <Button
          onClick={() => {
            closeModal();
          }}
          label="Add"
          Icon={BiPlus}
        />
      </div>
    </Modal>
  );
}

export default PatientMedicineServiceModal;
