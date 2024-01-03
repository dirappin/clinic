import React from 'react';

import HeroSection from '../../components/heroSection/HeroSection';
import ReceptionPhoto from '../../images/deo/reception1.png';
import Layout from '../../Layout';
import PatientsCart from '../../components/PatientsCart/PatientsCart';

const ReceptionAmbulatoire = () => {
  return (
    <Layout>
        <div className=' p-16'>
            <HeroSection
              name="reception Ambulatoire"
              nameService="reception"
              images={ReceptionPhoto}
          />
        </div>
        <div>
            <PatientsCart />
        </div>
    </Layout>
  )
}

export default ReceptionAmbulatoire