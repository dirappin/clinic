import React from "react";
import { Button } from "../../components/Form";
import { BiPlus } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { medicalRecodData } from "../../components/Datas";
import MedicalRecodModal from "../../components/Modals/MedicalRecodModal";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AxiosInstance from "../../ axiosInstance";
import Loader from "../../components/common/Loader";
import MedicalRecordItem from "./MedicalRecordItem";
import EmptyResult from "../../components/common/EmptyResult";

function MedicalRecord() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [datas, setDatas] = React.useState({});
  const navigate = useNavigate();
  const { patientId } = useParams();

  const [data, setData] = useState([]);
  const [displayError, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(true);

  const request = async () => {
    try {
      setDisplayError(false);
      setLoading(true);

      const response = await AxiosInstance.get(
        `medical-record/all/${patientId}`
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch data");
      }

      setData([...response.data.medicalRecords]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setDisplayError(true);
      toast.error("failed to load patient details");
    }
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-4">
          <h1 className="text-sm font-medium sm:block hidden">
            Medical Record
          </h1>
          <div className="sm:w-1/4 w-full">
            <Button
              label="New Record"
              Icon={BiPlus}
              onClick={() => {
                navigate(`/patients/visiting/${patientId}`);
              }}
            />
          </div>
        </div>

        {data.length < 1 && !loading && <EmptyResult disableButton={true} />}
        {loading && <Loader />}
        {data.map((item) => (
          <MedicalRecordItem item={item} />
        ))}
      </div>
    </>
  );
}

export default MedicalRecord;
