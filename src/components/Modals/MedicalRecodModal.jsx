import React from "react";
import Modal from "./Modal";
import { Button } from "../Form";
import { FiEye } from "react-icons/fi";
import { MedicineDosageTable } from "../Tables";
import { medicineData } from "../Datas";
import { useNavigate } from "react-router-dom";

function MedicalRecodModal({ closeModal, isOpen, item }) {
  const navigate = useNavigate();
  console.log(item);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="12 May 2021"
      width={"max-w-4xl"}
    >
      <div className="flex-colo gap-6">
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Doctor:</p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.doctorId.firstName + " " + item.doctorId.secondName}{" "}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Complains: </p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.complains}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Tete et cou: </p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.Teteetcou}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Thorax: </p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.Thorax}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Abdomen: </p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.Abdomen}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Exaen: </p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.ExaenOrl}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Appareil Locomoteur: </p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.ApparreilLocomoteur}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Diagnosis: </p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.Diagnosis}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Treatment: </p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.Treatments.map((treatment) => `${treatment.name} ,  `)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Prescription: </p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {item.prescribeMedecin.map(
                (medicine) => `${medicine.id.name} , `
              )}
            </p>
          </div>
        </div>

        {/* visual sign */}
        {/* <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Vital Signs:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {datas?.vitalSigns?.map((item) => (
                // separate each item with comma
                <span key={item} className="mr-1">
                  {item},
                </span>
              ))}
            </p>
          </div>
        </div> */}

        {/* medicine */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Prescriptions</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl overflow-hidden p-4">
            {/* <MedicineDosageTable
              data={medicineData?.slice(0, 3)}
              functions={{}}
              button={false}
            /> */}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Attachments:</p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6 xs:grid-cols-2 md:grid-cols-4 grid gap-4">
            {item.attachedImages.map(() => (
              <div className="w-40 h-40 rounded-lg bg-gray-300 flex items-center justify-center">
                <img
                  className=" object-contain"
                  src={
                    "https://res.cloudinary.com/dgbujfxvt/image/upload/v1706024647/tcpa9xnieoq9scecohk4.png"
                  }
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        {/* view Invoice */}
        <div className="flex justify-end items-center w-full">
          <div className="md:w-3/4 w-full">
            <Button
              label="View Invoice"
              Icon={FiEye}
              onClick={() => {
                closeModal();
                navigate(`/invoices/preview/198772`);
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MedicalRecodModal;
