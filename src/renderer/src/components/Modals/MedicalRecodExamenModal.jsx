import React from 'react';

import Modal from './Modal';

const MedicalRecodExamenModal = ({ closeModal, isOpen, data }) => {

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="12 May 2021"
      width={'max-w-4xl'}
    >
      <div className="flex-colo gap-6">

        <div key={data.id} className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Doctor:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data?.doctorId?.firstName || 'unknown'}    {data.doctorId.secondName}
            </p>
          </div>
        </div>

        <div key={data.id} className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-12 md:col-span-3">
            <p className="text-sm font-medium">Examen:</p>
          </div>
          <div className="col-span-12 md:col-span-9 border-[1px] border-border rounded-xl p-6">
            <p className="text-xs text-main font-light leading-5">
              {data?.examenDescription || 'unknown'}
            </p>
          </div>
        </div>


      </div>
    </Modal>
  )
}

export default MedicalRecodExamenModal