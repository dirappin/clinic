import React from 'react';

import HeroSection from '../../components/heroSection/HeroSection';
import HospitalisationPhoto from "../../images/deo/hospitalisation.png";
import Layout from '../../Layout';
import PatientsCart from '../../components/PatientsCart/PatientsCart';


const Hospitalisation = () => {
  return (
    <Layout>
        <div className=' p-16'>
            <HeroSection
              name="Hospitalisation"
              nameService="Hospitalisation"
              images={HospitalisationPhoto}
          />
        </div>
        <div>
            <PatientsCart />
        </div>
    </Layout>
  )
}

export default Hospitalisation