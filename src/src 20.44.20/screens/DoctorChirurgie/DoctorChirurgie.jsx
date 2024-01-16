import React from 'react'

import HeroSection from '../../components/heroSection/HeroSection';
import Layout from '../../Layout';
import DoctorCart from '../../components/DoctorCart/DoctorCart';
import DoctorAvatar1 from '../../images/deo/avatarDoctor1.png';

const DoctorChirurgie = () => {
  return (
    <Layout>
      <div className="p-16">
        <HeroSection
          name="chirurgie"
          images={DoctorAvatar1}
          nameService="chirurgie"
        />
      </div>
      <div>
        <DoctorCart />
      </div>
    </Layout>
  );
}

export default DoctorChirurgie