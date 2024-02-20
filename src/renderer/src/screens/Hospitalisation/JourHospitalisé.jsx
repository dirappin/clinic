import React from 'react';
import Layout from '../../Layout';
import { patientHostoTab } from '../../components/Datas';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import MedicalHostoRecord from './MedicalHostoRecord';





function JourHospitalisé() {
  const [activeTab, setActiveTab] = React.useState(1);

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <MedicalHostoRecord />;
      
    }
  };

  return (
    <Layout>
      <div className=" items-center">
        <h1 className="text-xl font-semibold text-center">Jour Hospitalisé</h1>
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <img
            src="/images/user7.png"
            alt="setting"
            className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
          />
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">de</h2>
            <p className="text-xs text-textGray">deo@gmail.com</p>
            <p className="text-xs">+256 77777777</p>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
            {patientHostoTab.map((tab, index) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                key={index}
                className={`
                ${
                  activeTab === tab.id
                    ? 'bg-text text-subMain'
                    : 'bg-dry text-main hover:bg-text hover:text-subMain'
                }
                text-xs gap-4 flex items-center w-full p-4 rounded`}
              >
                <tab.icon className="text-lg" /> {tab.title}
              </button>
            ))}
          </div>
        </div>
        {/* tab panel */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          {tabPanel()}
        </div>
      </div>
    </Layout>
  );
}

export default JourHospitalisé;

