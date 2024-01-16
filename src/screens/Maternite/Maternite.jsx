import React from 'react';

import HeroSection from '../../components/heroSection/HeroSection';
import MaternitePho from '../../images/deo/maternite.png'
import Layout from '../../Layout';
import PatientsCart from '../../components/PatientsCart/PatientsCart';

const Maternite = () => {
  return (
    <Layout>
        <div className=' p-16'>
            <HeroSection
              name="Maternité"
              nameService="Maternité"
              images={MaternitePho}
          />
        </div>
        <div>
            <PatientsCart />
        </div>
    </Layout>
  )
}

export default Maternite