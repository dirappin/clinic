import React, { useEffect, useState } from "react";
import { formatDate } from "../../util/formatDate";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import MedicalRecodModal from "../../components/Modals/MedicalRecodModal";
import { medicalRecodData } from "../../components/Datas";
import DeleteModal from "../../components/Modals/DeleteModal";
import AxiosInstancence from "../../ axiosInstance";
import toast from "react-hot-toast";

const MedicalRecordItem = ({ item,request }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    let accumulator = 0;
    item.Treatments.forEach((item) => {
      accumulator += parseFloat(item.price);
    });

    item.prescribeMedecin.forEach((item) => {
      accumulator += parseFloat(item.id.price);
    });

    setTotalPrice(accumulator);
  }, []);


  const deleteModal = async () => {
    setLoading(true)
    try {
      await AxiosInstancence.delete(`medical-record/${item._id}`);
      setLoading(false)
      request();
    } catch (error) {
      toast.error('Failed to delete the record');
      setLoading(false)
    }
  }

  return (
    <>
      {openDetail && (
        <MedicalRecodModal
          item={item}
          closeModal={() => setOpenDetail(false)}
          isOpen={true}
          datas={item}
        />
      )}

      {openDeleteModal && (
        <DeleteModal
          close={() => setDeleteModal(false)}
          action={deleteModal}
          isOpen={openDeleteModal}
          loading={loading}
        />
      )}

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
            {item.complains}
          </p>

          <p className="text-xs flex gap-2 text-main font-light">
            <span className="font-medium">Tete et cou: </span>
            {item.Teteetcou}
          </p>

          <p className="text-xs flex gap-2 text-main font-light">
            <span className="font-medium">Thorax: </span>
            {item.Thorax}
          </p>

          <p className="text-xs flex gap-2 text-main font-light">
            <span className="font-medium">Abdomen: </span>
            {item.Abdomen}
          </p>

          <p className="text-xs gap-2 flex text-main font-light">
            <span className="font-medium">Appareil Locomoteur: </span>
            {item.ApparreilLocomoteur}
          </p>

          <p className="text-xs gap-2 flex text-main font-light">
            <span className="font-medium">Exaen: </span>
            {item.ExaenOrl}
          </p>

          <p className="text-xs gap-2 text-main font-light">
            <span className="font-medium">Diagnosis:</span>
            {item.Diagnosis}
          </p>

          <p className="text-xs gap-2 text-main font-light">
            <span className="font-medium">Treatment: </span>
            {item.Treatments.map((treatment) => `${treatment.name} ,  `)}
          </p>

          <p className="text-xs gap-2 text-main font-light">
            <span className="font-medium">Prescription:</span>
            {item.prescribeMedecin.map((medicine) => `${medicine.id.name} , `)}
          </p>
        </div>

        {/* price */}
        <div className="col-span-12  md:col-span-2">
          <p className="text-xs text-subMain font-semibold">
            <span className="font-light text-main">(USD)</span> {totalPrice}
          </p>
        </div>

        {/* actions */}
        <div className="col-span-12 md:col-span-2 flex-rows gap-2">
          <button
            onClick={() => setOpenDetail(true)}
            className="text-sm flex-colo bg-white text-subMain border border-border rounded-md w-2/4 md:w-10 h-10"
          >
            <FiEye />
          </button>
          <button
            onClick={() => {
              setDeleteModal(true);
            }}
            className="text-sm flex-colo bg-white text-red-600 border border-border rounded-md w-2/4 md:w-10 h-10"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </>
  );
};

export default MedicalRecordItem;
