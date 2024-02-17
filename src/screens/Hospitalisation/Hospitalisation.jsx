import React from 'react';

import HeroSection from '../../components/heroSection/HeroSection';
import HospitalisationPhoto from "../../images/deo/hospitalisation.png";
import Layout from '../../Layout';
import PatientsCart from '../../components/PatientsCart/PatientsCart';
import Button from '../../components/Button/Button';


const Hospitalisation = () => {
  return (
    <Layout>
      <div className=" p-16">
        <HeroSection
          name="Hospitalisation"
          nameService="Hospitalisation"
          images={HospitalisationPhoto}
        />
      </div>
      <div className="flex justify-between p-8">
        <Button
          link="/patients"
          logo={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          }
          title="PATIENTS"
        />
        <Button
          link="/doctors"
          logo={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          }
          title="DOCTORS"
        />
      </div>
    </Layout>
  );
};

export default Hospitalisation;