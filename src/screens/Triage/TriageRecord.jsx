import React from 'react';

import { Button } from '../../components/Form';
import { BiPlus } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { medicalRecodTriageData } from '../../components/Datas';
import MedicalRecodTriageModal from '../../components/Modals/MedicalRecodTriageModal';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { backendBaseUrl } from '../../constant';
import TriageRecordElement from './TriageRecordElement';
import FetchError from '../error/fetchError';
import EmptyResult from '../../components/common/EmptyResult';



const TriageRecord = () => {

  const [isOpen, setIsOpen] = React.useState(false);
  const [datas, setDatas] = React.useState({});
  const navigate = useNavigate();
  const { patientId } = useParams();
  const { loading, data, error, mutate } = useSWR(`${backendBaseUrl}triages/find/all/${patientId}`)


  return (
    <>
      {
        // Modal
        isOpen && (
          <MedicalRecodTriageModal
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
          <h1 className="text-sm font-medium sm:block hidden">
            Triage Record
          </h1>
          <div className="sm:w-1/4 w-full">
            <Button
              label="New Record"
              Icon={BiPlus}
              onClick={() => {
                navigate(`/triage/visiting/${patientId}`);
              }}
            />
          </div>
        </div>
        {data && data.length < 1 && <EmptyResult lable={'No triage Yet'} disableButton />}
        {error && <FetchError loading={loading} action={() => mutate()} />}
        {data?.map((data) => (
          <TriageRecordElement data={data} />
        ))}
      </div>
    </>
  )
}

export default TriageRecord