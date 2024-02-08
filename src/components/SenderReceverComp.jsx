import React from 'react';
import { BiPlus } from 'react-icons/bi';

function SenderReceverComp({ item, functions, button }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 items-center mt-4">
      <div className="border border-border rounded-xl p-5">
        <div className="flex-btn gap-4">
          <h1 className="text-md font-semibold">From:</h1>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h6 className="text-xs font-medium">Delight Dental Clinic</h6>
          <p className="text-xs text-textGray">delightdental@gmail.com</p>
          <p className="text-xs text-textGray">+ (456) 786, 972, 90</p>
        </div>
      </div>

    </div>
  );
}

export default SenderReceverComp;
