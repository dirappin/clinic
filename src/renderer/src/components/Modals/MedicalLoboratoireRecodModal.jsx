import React from 'react';
import NoAttachement from '../common/NoAttachement';
import Modal from './Modal';
import { formatDate } from '../../util/formatDate';

const MedicalLoboratoireRecodModal = ({ closeModal, isOpen, data }) => {
  return (

    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={formatDate(data.createdAt)}
      width={'max-w-4xl'}
    >
      <div className="flex-colo gap-6">

        <div key={data.id} className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">doctor:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.doctorId.forstName} {data.doctorId.secondName}
            </p>
          </div>
        </div>

        <div key={data.id} className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Resulta:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.result}
            </p>
          </div>
        </div>

        <div key={data.id} className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Description:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.examenDescription}
            </p>
          </div>
        </div>


        <div key={data.id} className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">diagnosis:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data.diagnosis}
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
              // show attachments
              data?.attachedImages?.map((item) => (
                <img
                  key={item}
                  src={item}
                  alt="attachment"
                  className="w-full md:h-32 object-cover rounded-md"
                />
              ))
            }
            {
              data && data.attachedImages.length < 1 && <NoAttachement />
            }
          </div>
        </div>

      </div>
    </Modal>
  )
}

export default MedicalLoboratoireRecodModal

