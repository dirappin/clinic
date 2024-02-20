import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import PersonalInfo from "../../components/UsedComp/PersonalInfo";
import ChangePassword from "../../components/UsedComp/ChangePassword";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import PatientsUsed from "../../components/UsedComp/PatientsUsed";
import AppointmentsUsed from "../../components/UsedComp/AppointmentsUsed";
import { AgentTab } from "../../components/Datas";
import PaymentsUsed from "../../components/UsedComp/PaymentUsed";
import InvoiceUsed from "../../components/UsedComp/InvoiceUsed";
import Access from "../../components/Access";
import useSWR from "swr";
import { backendBaseUrl } from "../../constant";
import Loader from "../../components/common/Loader";
import AgentPersonalInfo from "../../components/UsedComp/AgentPersonalnfo";
import NetworkError from "../../components/error/networkError";
import { FaRegFaceFrown } from "react-icons/fa6";
import AgentAppointment from "../../components/UsedComp/AgentAppointment";


function AgentProfile() {
  const [activeTab, setActiveTab] = React.useState(1);
  const [access, setAccess] = React.useState({});
  const { agentId } = useParams();
  const { data, error, isLoading,mutate, } = useSWR(
    `${backendBaseUrl}user/find/one/${agentId}`
  );


  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return !error && data ? <AgentPersonalInfo data={data} titles={true} /> : <NetworkError loading={isLoading} callBack={() => mutate()} label={'Failed To Load Agent'} />;
      case 2:
        return <PatientsUsed />;
      case 3:
        return <AgentAppointment  />;
      case 4:
        return <PaymentsUsed doctor={true} />;
      case 5:
        return <InvoiceUsed />;
      case 6:
        return <Access setAccess={setAccess} />;
      case 7:
        return <ChangePassword />;
      default:
        return;
    }
  };

  return (
    <Layout>
      <div className="flex items-center gap-4">
        {data && data.user &&   <h1 className="text-xl font-semibold">{data.user.firstName} {data.user.secondName}</h1> }
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          {error && (
            <div className="p-4 bg-gray-600 rounded-md flex flex-col items-center justify-center">
              <FaRegFaceFrown className="text-4xl text-white" />
              <h1 className="text-white text-sm mt-5">Failed To Get Agent Details</h1>
            </div>
          )}
          {isLoading && <Loader className={" h-100"} />}
          {data && (
            <>
              <img
                src={data.user.profileImageUrl}
                alt="setting"
                className="w-40 h-40 rounded-full object-cover border border-dashed border-subMain"
              />
              <div className="gap-2 flex-colo">
                <h2 className="text-sm font-semibold">
                  {data.user.firstName} {data.user.secondName}{" "}
                </h2>
                <p className="text-xs text-textGray">{data.user.email}</p>
                <p className="text-xs">+{data.user.phoneNumber}</p>
              </div>
              {/* tabs */}
              <div className="flex-colo gap-3 px-2 2xl:px-12 w-full">
                {AgentTab.map((tab, index) => (
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
            </>
          )}
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

export default AgentProfile;
