import React from 'react';

import { Button } from '../../components/Form';
import { BiPlus } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { medicalLaboratoireRecodData } from '../../components/Datas';
import MedicalRadiographiRecodModal from '../../components/Modals/MedicalRadiographiRecodModal';
import { useNavigate, useParams } from 'react-router-dom';
import RadioExamRecord from '../../components/common/RadioExamRecord';

const RadiographieRecord = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [datas, setDatas] = React.useState({});
    const navigate = useNavigate();
    const {patientId} = useParams()

  return ( 
    <RadioExamRecord url={'radiographie'}/>
  )
}

export default RadiographieRecord