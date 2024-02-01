import React, { useRef } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import Layout from '../Layout';
import { Button, Select } from '../components/Form';
import { ServiceTable } from '../components/Tables';
import { servicesData, sortsDatas } from '../components/Datas';
import AddEditServiceModal from '../components/Modals/AddEditServiceModal';
import useSWR from 'swr';
import { backendBaseUrl } from '../constant';
import FetchError from './error/fetchError';
import Loader from '../components/common/Loader';


function Services() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [status, setStatus] = React.useState(sortsDatas.service[0]);
  const fetchMutateFunction = useRef();

  const onCloseModal = () => {
    setIsOpen(false);
    setData({});
  };

  return (
    <Layout>
      {isOpen && (
        <AddEditServiceModal
        title={'Add New Service'}
          isOpen={isOpen}
          method={'post'}
          url={'service'}
          closeModal={onCloseModal}
          mutate={fetchMutateFunction.current}
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
      <h1 className="text-xl font-semibold">Services</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border px-5"
      >
        {/* datas */}

        <div className="mt-8 w-full overflow-x-scroll">
          <ServiceTable  mutate={fetchMutateFunction} />
        </div>
      </div>
    </Layout>
  );
}

export default Services;
