import React from 'react';

import { Button } from '../../components/Form';
import { BiPlus } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { medicalLaboratoireRecodData } from '../../components/Datas';
import MedicalEchographieRecodModal from '../../components/Modals/MedicalEchographieRecodModal';
import { useNavigate, useParams } from 'react-router-dom';
import RadioExamRecord from '../../components/common/RadioExamRecord';

const EchographieRecord = () => {


  return (

    <RadioExamRecord url={'echographie'} />
  )
}

export default EchographieRecord