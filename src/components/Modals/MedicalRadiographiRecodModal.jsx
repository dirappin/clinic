import React from 'react';
import Modal from './Modal';
import NoAttachement from '../common/NoAttachement'
import { formatDate } from '../../util/formatDate';
const MedicalRadiographiRecodModal = ({ closeModal, isOpen, data }) => {

  return (

    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={formatDate(data.createdAt)}
      width={'max-w-4xl'}
    >
      <div className="flex-colo gap-6">
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Dictor:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.doctor.firstName} {data.doctor.secondName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Result:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.result}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Diagnosis:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.diagnosis}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Description:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.description}
            </p>
          </div>
        </div>


        {/* attachments */}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Attachments:</p>
          </div>

          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6 xs:grid-cols-2 md:grid-cols-4 grid gap-4">
            {
              data?.attachedImages?.map((item) => (
                <img
                  key={item}
                  src={item}
                  alt="attachment"
                  className="w-full md:h-32 object-cover rounded-md"
                />
              ))
            }

            {data.attachedImages.length < 1 && <NoAttachement />}
          </div>
        </div>

      </div>
    </Modal>
  )
}

export default MedicalRadiographiRecodModal