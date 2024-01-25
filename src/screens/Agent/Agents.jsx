import React, { useState } from "react";
import { AgentTable } from "../../components/Tables";
import Layout from "../../Layout";
import { memberAgentsData } from "../../components/Datas";

import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AddAgentsModal from "./AddAgentsModal";
import AdminAuthorization from "../../components/hoc/AdminAuthorization";


const Agents = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const [seachString, setSearchSatring] = useState("");

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const preview = (data) => {
    navigate(`/agents/preview/${data.id}`);
  };

  return (
    <AdminAuthorization role={"admin"}>
      <Layout>
        {
          // add doctor modal
          isOpen && (
            <AddAgentsModal
              closeModal={onCloseModal}
              isOpen={isOpen}
              doctor={true}
              datas={null}
            />
          )
        }
        {/* add button */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
        >
          <BiPlus className="text-2xl" />
        </button>
        {/*  */}
        <h1 className="text-xl font-semibold">Agents</h1>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
        >
          {/* datas */}

          <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
            <div className="md:col-span-5 grid lg:grid-cols-2 items-center gap-6">
              <input
                onChange={(e) => setSearchSatring(e.target.value)}
                type="text"
                placeholder='Search "daudi mburuge"'
                className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
              />
            </div>
          </div>

          <div className="mt-8 w-full overflow-x-scroll">
            <AgentTable
              search={seachString}
              doctor={true}
              data={memberAgentsData}
              functions={{
                preview: preview,
              }}
            />
          </div>
        </div>
      </Layout>
    </AdminAuthorization>
  );
};

export default Agents;
