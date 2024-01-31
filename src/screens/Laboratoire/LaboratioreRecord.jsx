import React from 'react';

import { Button } from '../../components/Form';
import { BiPlus } from 'react-icons/bi';
import MedicalLoboratoireRecodModal from '../../components/Modals/MedicalLoboratoireRecodModal';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { backendBaseUrl } from '../../constant';
import FetchError from '../error/fetchError';
import EmptyResult from '../../components/common/EmptyResult';
import LaboratoryElement from './LaboratoryElement';
import Loader from '../../components/common/Loader';


const LaboratioreRecord = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [datas, setDatas] = React.useState({});
  const navigate = useNavigate();
  const { patientId } = useParams();
  const { data, error, loading, mutate } = useSWR(`${backendBaseUrl}exams/find/all/exam-results/${patientId}`);


  return (
    <>
      {
        // Modal
        isOpen && (
          <MedicalLoboratoireRecodModal
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
            Laboratiore Record
          </h1>
          <div className="sm:w-1/4 w-full">
            <Button
              label="New Record"
              Icon={BiPlus}
              onClick={() => {
                navigate(`/laboratoire/visiting/${patientId}`);
              }}
            />
          </div>
        </div>

        {loading && <Loader />}
        {data && data.length < 1 && <EmptyResult disableButto />}
        {error && <FetchError action={() => mutate()} />}
        {data && data.map((data, index) => (
          <LaboratoryElement key={index} data={data} />
        ))}
      </div>
    </>
  )
}

export default LaboratioreRecord