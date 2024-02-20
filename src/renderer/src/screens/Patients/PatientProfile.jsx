import Examen from "../Examen/Examen";

import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { patientTab } from "../../components/Datas";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import MedicalRecord from "./MedicalRecord";
import AppointmentsUsed from "../../components/UsedComp/AppointmentsUsed";
import InvoiceUsed from "../../components/UsedComp/InvoiceUsed";
import PaymentsUsed from "../../components/UsedComp/PaymentUsed";
import PersonalInfo from "../../components/UsedComp/PersonalInfo";
import PatientImages from "./PatientImages";
import HealthInfomation from "./HealthInfomation";
import DentalChart from "./DentalChart";
import HospitalisationCart from "./HospitalisationCart";
import MaterniteCart from "../Maternite/MaterniteCart";
import ChirurgieRecord from "../DoctorChirurgie/ChirurgieRecord";
import EchographieRecord from "../Echographie/EchographieRecord";
import RadiographieRecord from "../Radiographie/RadiographieRecord";
import TriageRecord from "../Triage/TriageRecord";
import LaboratioreRecord from "../Laboratoire/LaboratioreRecord";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import toast from "react-hot-toast";
import NetworkError from "../../components/error/networkError";
import AxiosInstance from "../../ axiosInstance";
import { birthYearFormater } from "../../util/formatDate";
import { Outlet } from "react-router-dom";



function PatientProfile() {
  const [activeTab, setActiveTab] = React.useState(1);
  const { patientId } = useParams();
  const [data, setData] = useState({});
  const [displayError, setDisplayError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    try {
      setDisplayError(false);
      setLoading(true);

      const response = await AxiosInstance.get(`patient/${patientId}`);
      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to fetch data");
      }
      setData({ ...response.data });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setDisplayError(true);
      toast.error("failed to load patient details");
    }
  };

  useEffect(() => {
    request();
  }, []);

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <MedicalRecord />;
      case 2:
        return <HospitalisationCart />;
      case 3:
        return <TriageRecord />;
      case 4:
        return <ChirurgieRecord />;
      case 5:
        return <EchographieRecord />;
      case 6:
        return <MaterniteCart />;
      case 7:
        return <Examen />;
      case 8:
        return <LaboratioreRecord />;
      case 9:
        return <RadiographieRecord />;
      case 10:
        return <AppointmentsUsed doctor={false} />;
      case 11:
        return <InvoiceUsed />;
      case 12:
        return <PaymentsUsed doctor={false} />;
      case 15:
        return <PersonalInfo titles={false} />;
      default:
        return;
    }
  };


  return (
    <Layout>
      <div className="flex mb-5 items-center gap-4">
        <h1 className="text-xl font-semibold">{data && data.firstName + ' ' + data.secondName}</h1>
      </div>

      {displayError && <NetworkError callBack={request} />}
      {loading && <Loader />}

      {data && !displayError && (
        <div className="grid grid-cols-12 gap-6 my-8 items-start">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-offset="200"
            className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
          >
            <img
              src={data.ProfilePicture}
              alt="setting"
              className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
            />
            <div className="gap-2 flex-colo">
              <h2 className="text-sm font-semibold">
                {data.firstName} {data.secondName}
              </h2>
              <p className="text-xs text-textGray">{data.gender}</p>
              <p className="text-xs">+{data.phoneNumber}</p>
              <p className="text-xs"> <span className="text-gray-500">Urgent Contact: </span>  {data.emergencyContact}</p>
              <p className="text-xs text-subMain bg-text font-medium py-1 px-4 rounded-full border-[0.5px] border-subMain">
                Age: {birthYearFormater(data.birthdate)}
              </p>

            </div>
            {/* tabs */}
            <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
              {patientTab.map((tab, index) => (
                <button
                  onClick={() => setActiveTab(tab.id)}
                  key={index}
                  className={`
                ${activeTab === tab.id
                      ? "bg-text text-subMain"
                      : "bg-dry text-main hover:bg-text hover:text-subMain"
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
            <Outlet />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default PatientProfile;
