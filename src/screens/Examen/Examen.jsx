import React from "react";

import { Button } from "../../components/Form";
import { BiPlus } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import MedicalRecodExamenModal from "../../components/Modals/MedicalRecodExamenModal";
import { useNavigate, useParams } from "react-router-dom";
import { backendBaseUrl } from "../../constant";
import useSWR from "swr";
import ExamElement from "./ExamElement";
import Loader from "../../components/common/Loader";
import FetchError from "../error/fetchError";

const Examen = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [datas, setDatas] = React.useState({});
  const navigate = useNavigate();
  const { patientId } = useParams();
  const { loading, error, data, mutate } = useSWR(
    `${backendBaseUrl}exams/find/all/${patientId}`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  }
  );


  return (
    <>
      {
        // Modal
        isOpen && (
          <MedicalRecodExamenModal
            closeModal={() => {
              setIsOpen(false);
              setDatas({});
            }}
            isOpen={isOpen}
            datas={datas}
          />
        )
      }
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-4">
          <h1 className="text-sm font-medium sm:block hidden">Examen Record</h1>
          <div className="sm:w-1/4 w-full">
            <Button
              label="New Record"
              Icon={BiPlus}
              onClick={() => {
                navigate(`/examen/visiting/${patientId}`);
              }}
            />
          </div>
        </div>
        {loading && <Loader className={'h-40'} />}
        {error && <FetchError action={() => mutate()} />}
        {data &&
          data.length > 0 &&
          data.map((exam) => <ExamElement data={exam} />)}
      </div>
    </>
  );
};

export default Examen;
