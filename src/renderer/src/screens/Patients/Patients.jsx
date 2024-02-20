import React, { useState } from "react";
import Layout from "../../Layout";
import { sortsDatas } from "../../components/Datas";
import { Link, useNavigate } from "react-router-dom";
import { BsCalendarMonth } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { PatientTable } from "../../components/Tables";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import PatientStatus from "./PatientStatus";



function Patients() {
  const [status, setStatus] = useState(sortsDatas.filterPatient[0]);
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const navigate = useNavigate();

  const sorts = [
    {
      id: 2,
      selected: status,
      setSelected: setStatus,
      datas: sortsDatas.filterPatient,
    },
    {
      id: 3,
      selected: gender,
      setSelected: setGender,
      datas: sortsDatas.genderFilter,
    },
  ];

  // boxes
  const boxes = [
    {
      id: 1,
      title: "Today Patients",
      value: "10",
      color: ["bg-subMain", "text-subMain"],
      icon: BiTime,
      path: "today",
    },
    {
      id: 2,
      title: "Monthly Patients",
      value: "230",
      color: ["bg-orange-500", "text-orange-500"],
      icon: BsCalendarMonth,
      path: "months"
    },
    {
      id: 3,
      title: "Yearly Patients",
      value: "1,500",
      color: ["bg-green-500", "text-green-500"],
      icon: MdOutlineCalendarMonth,
      path: "years"
    },
  ];


  return (
    <Layout>
      {/* add button */}
      <Link
        to="/patients/create"
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </Link>
      <h1 className="text-xl font-semibold">Patients</h1>
      {/* boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {boxes.map((box, index) => (
          <PatientStatus key={index} path={box.path} box={box} />
        ))}
      </div>
      {/* datas */}

      <PatientTable />
    </Layout>
  );
}

export default Patients;
