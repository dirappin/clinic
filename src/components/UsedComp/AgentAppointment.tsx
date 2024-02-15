import React from "react";
import { useState } from "react";
import { appointmentsData } from "../Datas";
import AddAppointmentModal from "../Modals/AddApointmentModal";
import { AppointmentTable } from "../Tables";
import { Button } from "../Form";
import useSWR from "swr";
import { backendBaseUrl } from "../../constant";
import { useParams } from "react-router-dom";
import { AgentAppointmentTable } from "../Tables";
import user from "../../state/user";
import { useRecoilValue } from "recoil";


function AgentAppointment({ doctor }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const userData = useRecoilValue(user);
  const { mutate } = useSWR(`${backendBaseUrl}appointments/agent/${userData._id}`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  // onClick event handler
  const handleEventClick = (event) => {
    setData(event);
    setOpen(!open);
  };
  // handle modal close
  const handleClose = () => {
    setOpen(!open);
    setData({});
  };
  return (
    <div className="w-full">
      {open && (
        <AddAppointmentModal
          mutate={mutate}
          datas={data}
          isOpen={open}
          closeModal={() => {
            handleClose();
          }}
        />
      )}

      <div className="flex items-center pb-4 justify-between">
        <h1 className="text-sm font-medium">Appointments</h1>
      </div>

      <div className="w-full overflow-x-scroll">
        <AgentAppointmentTable
          data={appointmentsData}
          doctor={doctor}
          functions={{
            preview: handleEventClick,
          }}
        />
      </div>
    </div>
  );
}

export default AgentAppointment;
