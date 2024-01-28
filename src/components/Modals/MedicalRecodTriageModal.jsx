import React from 'react';

import Modal from './Modal';
import { Button } from '../Form';
import { FiEye } from 'react-icons/fi';
import EmptyResult from '../common/EmptyResult';
import { formatDate } from '../../util/formatDate';

import { useNavigate } from 'react-router-dom';

const MedicalRecodTriageModal = ({ closeModal, isOpen, data }) => {
  console.log(data);
  return (

    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={formatDate(data.createdAt)}
      width={'max-w-4xl'}
    >
      <div className="flex-colo gap-6">


        {/* visual sign */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Poid:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.poid}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Doctor:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.doctor.firstName} {data.doctor.secondName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">TA:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.TA}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">PU:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.PU}
            </p>
          </div>
        </div>


        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Temperature:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.Temperature}
            </p>
          </div>
        </div>


        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">saturometre:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.saturometre}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Plainte:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.complains}
            </p>
          </div>
        </div>


        {/* attachments */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Attachments:</p>
          </div>
          <div className="w-full col-span-full">
            {
              // show attachments
              data?.attachedImage?.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="attachment"
                  className="w-full md:h-32 object-cover rounded-md"
                />
              ))
            }
            {
              !data.attachedImage && (
                <div className='w-full rounded-lg border'>
                  <EmptyResult disableButton className='w-full left-[50%] relative' lable={'No attachement left'} />
                </div>)
            }
          </div>
        </div>

        {/* view Invoice */}
        <div className="flex justify-end items-center w-full">

          <Button
            label="Close"
            Icon={FiEye}
            onClick={() => {
              closeModal();
            }}
          />

        </div>
      </div>
    </Modal>
  )
}

export default MedicalRecodTriageModal