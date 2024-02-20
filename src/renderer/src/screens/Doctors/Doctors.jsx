import React, { useState } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiPlus } from 'react-icons/bi';
import Layout from '../../Layout';
import { Button } from '../../components/Form';
import { DoctorsTable } from '../../components/Tables';
import { doctorsData } from '../../components/Datas';
import { useNavigate } from 'react-router-dom';
import AddDoctorModal from '../../components/Modals/AddDoctorModal';
import { AgentTable } from '../../components/Tables';


function Doctors() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  const onCloseModal = () => {
    setIsOpen(false);
  };


  return (
    <Layout>
      {
        // add doctor modal
        isOpen && (
          <AddDoctorModal
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
      <h1 className="text-xl font-semibold">Doctors</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* datas */}

        <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
          <div className="md:col-span-6 grid lg:grid-cols-2 items-center gap-6">
            <input
              onChange={((e) => setSearchString(e.target.value))}
              type="text"
              placeholder='Search "daudi mburuge"'
              className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
            />
          </div>

        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <AgentTable
            search={searchString}
            url='user/doctors'
          />
        </div>
      </div>
    </Layout>
  );
}

export default Doctors;
