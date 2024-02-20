import React, { useRef } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import Layout from '../Layout';
import { Button, Select } from '../components/Form';
import { MedicineTable } from '../components/Tables';
import { medicineData, sortsDatas } from '../components/Datas';
import AddEditMedicineModal from '../components/Modals/AddEditMedicine';
import { backendBaseUrl } from '../constant';
import useSWR from 'swr';

function Medicine() {
  const {mutate } =  useSWR(backendBaseUrl + 'pharmacy/' + 'find-all-medcine');

  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [status, setStatus] = React.useState(sortsDatas.stocks[0]);


  const onCloseModal = () => {
    setIsOpen(false);
    setData({});
  };

  const onEdit = (datas) => {
    setData(datas);
    setIsOpen(true);
  };

  return (
    <Layout>
      {isOpen && (
        <AddEditMedicineModal
          datas={data}
          isOpen={isOpen}
          closeModal={onCloseModal}
          mutate={mutate}
        />
      )}
      {/* add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      {/*  */}
      <h1 className="text-xl font-semibold">Medicine</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* datas */}

        <div className="w-full overflow-x-scroll">
          <MedicineTable data={medicineData} onEdit={onEdit} />
        </div>
      </div>
    </Layout>
  );
}

export default Medicine;
