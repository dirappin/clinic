import React from 'react';

import HeroSection from '../../components/heroSection/HeroSection';
import ReceptionPhoto from '../../images/deo/reception1.png';
import Layout from '../../Layout';
import Patients from '../Patients/Patients';
import { PatientTable } from '../../components/Tables';

const ReceptionAmbulatoire = () => {
  return (
    <Layout>
      <PatientTable />
    </Layout>
  )
}

export default ReceptionAmbulatoire