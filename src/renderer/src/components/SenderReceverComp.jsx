import React from 'react';
import { BiPlus } from 'react-icons/bi';

function SenderReceverComp({ item }) {

  return (
    <div className="grid sm:grid-cols-2 gap-6 items-center mt-4">
      <div className="border border-border rounded-xl p-5">
        <div className="flex-btn gap-4">
          <h1 className="text-md font-semibold">From: <span className='text-sm font-light text-gray-600'>{item.firstName} {item.secondName}</span></h1>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-xs text-textGray">{item.email}</p>
          <p className="text-xs text-textGray">{item.phoneNumber}</p>
        </div>
      </div>

    </div>
  );
}

export default SenderReceverComp;
