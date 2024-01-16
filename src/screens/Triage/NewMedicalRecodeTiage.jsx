

import React, { useState } from 'react';
import Layout from '../../Layout';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Button, Select, Textarea } from '../../components/Form';
import { BiChevronDown,} from 'react-icons/bi';
import { memberData } from '../../components/Datas';
import { toast } from 'react-hot-toast';
import MedicineDosageModal from '../../components/Modals/MedicineDosage';
import { FaTimes } from 'react-icons/fa';
import Uploader from '../../components/Uploader';
import { HiOutlineCheckCircle } from 'react-icons/hi';

const doctorsData = memberData.map((item) => {
    return {
      id: item.id,
      name: item.title,
    };
  });

const NewMedicalRecodeTiage = () => {
    const [doctors, setDoctors] = useState(doctorsData[0]);
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <Layout>
        {
          // modal
          isOpen && (
            <MedicineDosageModal
              isOpen={isOpen}
              closeModal={() => {
                setIsOpen(false);
              }}
            />
          )
        }
        <div className="flex items-center gap-4">
          <Link
            to={`/patients/visiting/8`}
            className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
          >
            <IoArrowBackOutline />
          </Link>
          <h1 className="text-xl font-semibold">New Medical Record</h1>
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
              <h2 className="text-sm font-semibold">Deogratias Ndayazi</h2>
              <p className="text-xs text-textGray">deo@gmail.com</p>
              <p className="text-xs">+256 778 519 051</p>
              <p className="text-xs text-subMain bg-text font-medium py-1 px-4 rounded-full border-[0.5px] border-subMain">
                32 yrs{' '}
              </p>
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
            <div className="flex w-full flex-col gap-5">
              {/* doctor */}
              <div className="flex w-full flex-col gap-3">
                <p className="text-black text-sm">Doctor</p>
                <Select
                  selectedPerson={doctors}
                  setSelectedPerson={setDoctors}
                  datas={doctorsData}
                >
                  <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                    {doctors.name} <BiChevronDown className="text-xl" />
                  </div>
                </Select>
              </div>
              {/* Poids */}
              <Textarea
                label="Poids"
                color={true}
                rows={3}
                placeholder={'Poids ....'}
              />
               {/* TA */}
               <Textarea
                label="TA"
                color={true}
                rows={3}
                placeholder={'TA ....'}
              />
              {/*  PU */}
              <Textarea
                label="PU"
                color={true}
                rows={3}
                placeholder={'PU, ....'}
              />
              {/* Température */}
              <Textarea
                label="Température"
                color={true}
                rows={3}
                placeholder={'Température, ....'}
              />
              {/* SATUROMAITRE */}
              <Textarea
                label="SATUROMAITRE"
                color={true}
                rows={3}
                placeholder={'SATUROMAITRE ....'}
              />
              {/*  Plaintes */}
              <Textarea
                label="Plaintes"
                color={true}
                rows={3}
                placeholder={' ....'}
              />
              {/* attachment */}
              <div className="flex w-full flex-col gap-4">
                <p className="text-black text-sm">Attachments</p>
                <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div className="relative w-full">
                      <img
                        src={`https://placehold.it/300x300?text=${i}`}
                        alt="patient"
                        className="w-full  md:h-40 rounded-lg object-cover"
                      />
                      <button
                        onClick={() =>
                          toast.error('This feature is not available yet.')
                        }
                        className="bg-white rounded-full w-8 h-8 flex-colo absolute -top-1 -right-1"
                      >
                        <FaTimes className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
                <Uploader setImage={{}} />
              </div>
              {/* submit */}
              <Button
                label={'Save'}
                Icon={HiOutlineCheckCircle}
                onClick={() => {
                  toast.error('This feature is not available yet');
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default NewMedicalRecodeTiage