import React, { useEffect, useRef, useState } from "react";
import { MenuSelect } from "./Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit, FiEye } from "react-icons/fi";
import { RiDeleteBin6Line, RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import Loader from "./common/Loader";
import NetworkError from "../screens/error/networkError";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { backendBaseUrl } from "../constant";
import { MdClose } from "react-icons/md";
import EmptyResult from "./common/EmptyResult";
import { formatDate } from "../util/formatDate";
import FetchError from "../screens/error/fetchError";
import ServiceTableItem from "./ServiceTableItem";
import Button from "./Button/Button";
import { MdOutlineCloudDownload } from 'react-icons/md';

const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

export function Transactiontable({ data, action, functions }) {
  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (data) => {
        functions.edit(data.id);
      },
    },
    {
      title: "View",
      icon: FiEye,
      onClick: (data) => {
        functions.preview(data.id);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>Patient</th>
          <th className={thclass}>Date</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>
            Amout <span className="text-xs font-light">(Tsh)</span>
          </th>
          <th className={thclass}>Method</th>
          {action && <th className={thclass}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>{index + 1}</td>
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <span className="w-12">
                  <img
                    src={item.user.image}
                    alt={item.user.title}
                    className="w-full h-12 rounded-full object-cover border border-border"
                  />
                </span>

                <div>
                  <h4 className="text-sm font-medium">{item.user.title}</h4>
                  <p className="text-xs mt-1 text-textGray">
                    {item.user.phone}
                  </p>
                </div>
              </div>
            </td>
            <td className={tdclass}>{item.date}</td>
            <td className={tdclass}>
              <span
                className={`py-1 px-4 ${item.status === "Paid"
                  ? "bg-subMain text-subMain"
                  : item.status === "Pending"
                    ? "bg-orange-500 text-orange-500"
                    : item.status === "Cancel" && "bg-red-600 text-red-600"
                  } bg-opacity-10 text-xs rounded-xl`}
              >
                {item.status}
              </span>
            </td>
            <td className={`${tdclass} font-semibold`}>{item.amount}</td>
            <td className={tdclass}>{item.method}</td>
            {action && (
              <td className={tdclass}>
                <MenuSelect datas={DropDown1} item={item}>
                  <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                    <BiDotsHorizontalRounded />
                  </div>
                </MenuSelect>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// invoice table
export function InvoiceTable({ data }) {
  const navigate = useNavigate();
  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (item) => {
        navigate(`/invoices/edit/${item.id}`);
      },
    },
    {
      title: "View",
      icon: FiEye,
      onClick: (item) => {
        navigate(`/invoices/preview/${item.id}`);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Invoice ID</th>
          <th className={thclass}>Patient</th>
          <th className={thclass}>Created Date</th>
          <th className={thclass}>Due Date</th>
          <th className={thclass}>
            Amout <span className="text-xs font-light">(Tsh)</span>
          </th>
          <th className={thclass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>#{item?.id}</td>
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <span className="w-12">
                  <img
                    src={item?.to?.image}
                    alt={item?.to?.title}
                    className="w-full h-12 rounded-full object-cover border border-border"
                  />
                </span>
                <div>
                  <h4 className="text-sm font-medium">{item?.to?.title}</h4>
                  <p className="text-xs mt-1 text-textGray">
                    {item?.to?.email}
                  </p>
                </div>
              </div>
            </td>
            <td className={tdclass}>{item?.createdDate}</td>
            <td className={tdclass}>{item?.dueDate}</td>
            <td className={`${tdclass} font-semibold`}>{item?.total}</td>
            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// prescription table
export function MedicineTable({ data, onEdit }) {
  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (item) => {
        onEdit(item);
      },
    },
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (item) => {
        onEdit(item);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Name</th>
          <th className={thclass}>
            Price <span className="text-xs font-light">(USD)</span>
          </th>
          <th className={thclass}>Status</th>
          <th className={thclass}>InStock</th>
          <th className={thclass}>Measure</th>
          <th className={thclass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>
              <h4 className="text-sm font-medium">{item?.name}</h4>
            </td>
            <td className={`${tdclass} font-semibold`}>{item?.price}</td>
            <td className={tdclass}>
              <span
                className={`text-xs font-medium ${item?.status === "Out of stock"
                  ? "text-red-600"
                  : "text-green-600"
                  }`}
              >
                {item?.status}
              </span>
            </td>
            <td className={tdclass}>{item?.stock}</td>
            <td className={tdclass}>{item?.measure}</td>
            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// service table
export function ServiceTable({ mutate: reload }) {
  const { data: servicesData, loading, error, mutate } = useSWR(`${backendBaseUrl}service`);
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    reload.current = mutate;
  }, [])

  const DropDown1 = [
    {
      title: "Edit",
      icon: FiEdit,
      onClick: (item) => {
        onEdit(item);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
        <div className="md:col-span-5 mb-4 grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-2">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder='Search "teeth cleaning"'
            className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
          />
        </div>

      </div>
      
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>Name</th>
            <th className={thclass}>Created At</th>
            <th className={thclass}>
              Price <span className="text-xs font-light">(Tsh)</span>
            </th>
            <th className={thclass}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && <Loader className={'h-56'} />}
          {servicesData && servicesData.filter((item) => item.name.toUpperCase().includes(searchValue.toUpperCase())).map((item, index) => (
            <ServiceTableItem mutate={mutate} key={index} item={item} />
          ))}
        </tbody>
      </table>
      {error && <FetchError  description={'Failed to load services'} action={() => mutate()} />}
    </div>
  );
}

// patient table
// patient table
export function PatientTable() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const searchInput = useRef();
  const [showNotFountResult, setShowNotFountResult] = useState(false);

  const { data, error, isLoading } = useSWR(
    `${backendBaseUrl}patient/?skip=${1}`
  );

  const thclasse = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
  const tdclasse = "text-start text-xs py-4 px-2 whitespace-nowrap";

  const searchPatient = async () => {
    if (searchInput.current.value.trim() === "") return;
    setSearchLoading(true);
    setShowNotFountResult(false);

    try {
      const request = await axios.post(
        backendBaseUrl + "patient/searchByName",
        {
          name: searchInput.current.value,
        }
      );
      setSearchResult(request.data);
      setSearchLoading(false);
      if (request.data.length === 0) setShowNotFountResult(true);
    } catch (error) {
      setSearchLoading(false);
      toast.error("failed to find patient");
    }
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="10"
      data-aos-offset="200"
      className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
    >
      <div className="w-full overflow-x-scroll bg-white">
        <div className="grid mb-10  lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
          <input
            ref={searchInput}
            searchInput
            defaultChecked={name}
            type="text"
            placeholder='Search "Patients"'
            className="h-14 text-sm text-main rounded-md bg-dry border border-border px-4"
          />

          <button
            disabled={name.trim("") === " "}
            onClick={() => {
              if (searchResult.length > 0) {
                setSearchResult([]);
                setName("");
                searchInput.current.value = "";
              } else {
                searchPatient();
              }
            }}
            className="max-w-16 cursor-pointer text-gray-700 active:bg-gray-100 h-full bg-gray-50  flex items-center justify-center rounded-md border"
          >
            {searchLoading && <span className="text-[10px]">...loading</span>}

            {!searchLoading && searchResult.length < 1 && (
              <IoSearchOutline className="text-md " />
            )}

            {searchResult.length > 0 && <MdClose />}
          </button>
        </div>
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclasse}>#</th>
              <th className={thclasse}>Patient</th>
              <th className={thclasse}>Created At</th>
              <th className={thclasse}>Gender</th>

              <>
                <th className={thclasse}>Blood Group</th>
                <th className={thclasse}>Age</th>
              </>

              <th className={thclasse}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              searchResult.length < 1 &&
              !showNotFountResult &&
              data.patients.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-border hover:bg-greyed transitions"
                >
                  <td className={tdclasse}>{index + 1}</td>
                  <td className={tdclasse}>
                    <div className="flex gap-4 items-center">
                      <span className="w-12">
                        <img
                          src={item.ProfilePicture}
                          alt={item.firstName}
                          className="w-full h-12 rounded-full object-cover border border-border"
                        />
                      </span>

                      <div>
                        <h4 className="text-sm font-medium">
                          {item.firstName + " "}
                          {item.secondName}{" "}
                        </h4>
                        <p className="text-xs mt-1 text-textGray">
                          {item.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={tdclasse}>
                    {new Date(item.createdAt).getFullYear()}
                  </td>

                  <td className={tdclasse}>
                    <span
                      className={`py-1 px-4 ${item.gender === "Male"
                        ? "bg-subMain text-subMain"
                        : "bg-orange-500 text-orange-500"
                        } bg-opacity-10 text-xs rounded-xl`}
                    >
                      {item.gender}
                    </span>
                  </td>

                  <>
                    <td className={tdclasse}>{item.blood}</td>
                    <td className={tdclasse}>
                      {new Date().getFullYear() -
                        new Date(item.birthdate).getFullYear()}
                    </td>
                  </>

                  <td className={tdclasse}>
                    <MenuSelect
                      datas={[
                        {
                          title: "View",
                          icon: FiEye,
                          onClick: () => {
                            navigate("/patients/preview/" + item._id);
                          },
                        },
                        {
                          title: "Delete",
                          icon: RiDeleteBin6Line,
                          onClick: () => {
                            toast.error("This feature is not available yet");
                          },
                        },
                      ]}
                    >
                      <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                        <BiDotsHorizontalRounded />
                      </div>
                    </MenuSelect>
                  </td>
                </tr>
              ))}

            {/* search result */}
            {searchResult.length > 0 &&
              !showNotFountResult &&
              searchResult.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-border hover:bg-greyed transitions"
                >
                  <td className={tdclasse}>{index + 1}</td>
                  <td className={tdclasse}>
                    <div className="flex gap-4 items-center">
                      <span className="w-12">
                        <img
                          src={item.ProfilePicture}
                          alt={item.firstName}
                          className="w-full h-12 rounded-full object-cover border border-border"
                        />
                      </span>

                      <div>
                        <h4 className="text-sm font-medium">
                          {item.firstName + " "}
                          {item.secondName}{" "}
                        </h4>
                        <p className="text-xs mt-1 text-textGray">
                          {item.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={tdclasse}>
                    {new Date(item.createdAt).getFullYear()}
                  </td>

                  <td className={tdclasse}>
                    <span
                      className={`py-1 px-4 ${item.gender === "Male"
                        ? "bg-subMain text-subMain"
                        : "bg-orange-500 text-orange-500"
                        } bg-opacity-10 text-xs rounded-xl`}
                    >
                      {item.gender}
                    </span>
                  </td>

                  <>
                    <td className={tdclasse}>{item.blood}</td>
                    <td className={tdclasse}>
                      {new Date().getFullYear() -
                        new Date(item.birthdate).getFullYear()}
                    </td>
                  </>

                  <td className={tdclasse}>
                    <MenuSelect
                      datas={[
                        {
                          title: "View",
                          icon: FiEye,
                          onClick: () => {
                            navigate("/patients/preview/" + item._id);
                          },
                        },
                        {
                          title: "Delete",
                          icon: RiDeleteBin6Line,
                          onClick: () => {
                            toast.error("This feature is not available yet");
                          },
                        },
                      ]}
                    >
                      <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                        <BiDotsHorizontalRounded />
                      </div>
                    </MenuSelect>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {showNotFountResult && searchResult.length < 1 && (
          <EmptyResult
            close={() => {
              setShowNotFountResult(false);
              searchInput.current.value = "";
            }}
          />
        )}

        {isLoading && <Loader />}
        {error && !isLoading && <NetworkError />}
      </div>
    </div>
  );
}

// doctor table
export function DoctorsTable({ data, functions, doctor }) {
  const DropDown1 = [
    {
      title: "View",
      icon: FiEye,
      onClick: (data) => {
        functions.preview(data);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        toast.error("This feature is not available yet");
      },
    },
  ];
  return (
    <table className="table-auto w-full bg-dry">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>#</th>
          <th className={thclass}>{doctor ? "Doctor" : "Receptionist"}</th>
          <th className={thclass}>Created At</th>
          <th className={thclass}>Phone</th>
          <th className={thclass}>Title</th>
          <th className={thclass}>Age</th>
          <th className={thclass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>{index + 1}</td>
            <td className={tdclass}>
              <div className="flex gap-4 items-center">
                <span className="w-12">
                  <img
                    src={item.user.image}
                    alt={item.user.title}
                    className="w-full h-12 rounded-full object-cover border border-border"
                  />
                </span>
                <h4 className="text-sm font-medium">{item.user.title}</h4>
              </div>
            </td>
            <td className={tdclass}>12 May, 2021</td>
            <td className={tdclass}>
              <p className="text-textGray">{item.user.phone}</p>
            </td>
            <td className={tdclass}>{item.title}</td>
            <td className={tdclass}>{item.user.age}</td>

            <td className={tdclass}>
              <MenuSelect datas={DropDown1} item={item}>
                <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                  <BiDotsHorizontalRounded />
                </div>
              </MenuSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// agent table
export function AgentTable({ functions, search = "" }) {
  const { data, error, isLoading } = useSWR(`${backendBaseUrl}user/find/all`);
  const navigate = useNavigate();

  const DropDown1 = [
    {
      title: "View",
      icon: FiEye,
      onClick: (id) => {
        navigate('/agents/preview/' + id._id);
      },
    },
    {
      title: "Delete",
      icon: RiDeleteBin6Line,
      onClick: () => {
        navia;
      },
    },
  ];
  return (
    <>
      {data && data.length < 1 && <EmptyResult lable={"No Agent Yet"} />}
      {error && <NetworkError label={"Failed To Load Agents"} />}
      {isLoading && <Loader />}
      {data && data.length > 0 && (
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclass}>#</th>
              <th className={thclass}>{"Agents"}</th>
              <th className={thclass}>Role</th>
              <th className={thclass}>Created At</th>
              <th className={thclass}>Phone</th>
              <th className={thclass}>Salary</th>
              <th className={thclass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .filter((filter) =>
                  (filter.firstName + filter.secondName)
                    .toUpperCase()
                    .includes(search.toUpperCase())
                )
                .map((agent, index) => (
                  <tr
                    key={agent.__id}
                    className="border-b border-border hover:bg-greyed transitions"
                  >
                    <td className={tdclass}>{index + 1}</td>
                    <td className={tdclass}>
                      <div className="flex gap-4 items-center">
                        <span className="w-12">
                          <img
                            src={agent.profileImageUrl}
                            alt={agent.firstName}
                            className="w-full h-12 rounded-full object-cover border border-border"
                          />
                        </span>
                        <h4 className="text-sm font-medium">
                          {agent.firstName} {agent.secondName}
                        </h4>
                      </div>
                    </td>
                    <td className={tdclass}>{agent.role}</td>
                    <td className={tdclass}>{formatDate(agent.createdAt)}</td>
                    <td className={tdclass}>
                      <p className="text-textGray">+{agent.phoneNumber}</p>
                    </td>
                    <td className={tdclass}>{agent.salary}</td>

                    <td className={tdclass}>
                      <MenuSelect datas={DropDown1} item={agent}>
                        <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                          <BiDotsHorizontalRounded />
                        </div>
                      </MenuSelect>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
    </>
  );
}

// appointment table
export function AppointmentTable({ data, functions, doctor }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Date</th>
          <th className={thclass}>{doctor ? "Patient" : "Doctor"}</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>Time</th>
          <th className={thclass}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>
              <p className="text-xs">{item.date}</p>
            </td>
            <td className={tdclass}>
              <h4 className="text-xs font-medium">
                {doctor ? item.user.title : item.doctor.title}
              </h4>
              <p className="text-xs mt-1 text-textGray">
                {doctor ? item.user.phone : item.doctor.phone}
              </p>
            </td>
            <td className={tdclass}>
              <span
                className={`py-1  px-4 ${item.status === "Approved"
                  ? "bg-subMain text-subMain"
                  : item.status === "Pending"
                    ? "bg-orange-500 text-orange-500"
                    : item.status === "Cancel" && "bg-red-600 text-red-600"
                  } bg-opacity-10 text-xs rounded-xl`}
              >
                {item.status}
              </span>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{`${item.from} - ${item.to}`}</p>
            </td>

            <td className={tdclass}>
              <button
                onClick={() => functions.preview(item)}
                className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10"
              >
                <FiEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// payment table
export function PaymentTable({ data, functions, doctor }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Date</th>
          <th className={thclass}>{doctor ? "Patient" : "Doctor"}</th>
          <th className={thclass}>Status</th>
          <th className={thclass}>Amount</th>
          <th className={thclass}>Method</th>
          <th className={thclass}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>
              <p className="text-xs">{item.date}</p>
            </td>
            <td className={tdclass}>
              <h4 className="text-xs font-medium">
                {doctor ? item.user.title : item.doctor.title}
              </h4>
              <p className="text-xs mt-1 text-textGray">
                {doctor ? item.user.phone : item.doctor.phone}
              </p>
            </td>
            <td className={tdclass}>
              <span
                className={`py-1  px-4 ${item.status === "Paid"
                  ? "bg-subMain text-subMain"
                  : item.status === "Pending"
                    ? "bg-orange-500 text-orange-500"
                    : item.status === "Cancel" && "bg-red-600 text-red-600"
                  } bg-opacity-10 text-xs rounded-xl`}
              >
                {item.status}
              </span>
            </td>
            <td className={tdclass}>
              <p className="text-xs font-semibold">{`$${39}`}</p>
            </td>

            <td className={tdclass}>
              <button
                onClick={() => functions.preview(item.id)}
                className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10"
              >
                <FiEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// invoice used table
export function InvoiceUsedTable({ data, functions }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Invoice ID</th>
          <th className={thclass}>Create Date</th>
          <th className={thclass}>Due Date</th>
          <th className={thclass}>Amount</th>
          <th className={thclass}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={tdclass}>
              <p className="text-xs">#{item.id}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.createdDate}</p>
            </td>
            <td className={tdclass}>
              <p className="text-xs">{item.dueDate}</p>
            </td>

            <td className={tdclass}>
              <p className="text-xs font-semibold">{`$${item.total}`}</p>
            </td>

            <td className={tdclass}>
              <button
                onClick={() => functions.preview(item.id)}
                className="text-sm flex-colo bg-white text-subMain border rounded-md w-10 h-10"
              >
                <FiEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// invoice table
export function InvoiceProductsTable({ data, functions, button }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Item</th>
          <th className={thclass}>
            Item Price
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          <th className={thclass}>Quantity</th>
          <th className={thclass}>
            Amout
            <span className="text-xs font-light ml-1">(Tsh)</span>
          </th>
          {button && <th className={thclass}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={`${tdclass}  font-medium`}>{item.name}</td>
            <td className={`${tdclass} text-xs`}>{item.price}</td>
            <td className={tdclass}>{item.id}</td>
            <td className={tdclass}>{item.price * item.id}</td>
            {button && (
              <td className={tdclass}>
                <button
                  onClick={() => functions.deleteItem(item.id)}
                  className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm"
                >
                  <RiDeleteBinLine />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// medicine Dosage table
export function MedicineDosageTable({
  data = {},
  functions,
  button,
  deleteMedecin,
}) {
  const thclasse = "text-start text-xs font-medium py-3 px-2 whitespace-nowrap";
  const tdclasse = "text-center text-xs py-4 px-2 whitespace-nowrap";

  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclasse}>Item</th>
          <th className={thclasse}>
            Price
            <span className="text-xs font-light ml-1">($)</span>
          </th>

          <th className={thclasse}>Dosage</th>
          <th className={thclasse}>Instraction</th>
          <th className={thclasse}>Quantity</th>
          <th className={thclasse}>Dosage Quantity</th>
          <th className={thclasse}>Total amount</th>
          {button && <th className={thclasse}>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data?.map((item) => (
          <tr
            key={item.id._id}
            className="border-b border-border text-center hover:bg-greyed transitions"
          >
            <td className={tdclasse}>{item.id.name}</td>
            <td className={tdclasse}>{item.id.price}</td>
            <td className={tdclasse}>
              {item.dosage.length < 1 && <>- - - </>}

              {item.dosage.map((item, index) => (
                <span key={`_medical_record_dosage_${index}`}>{item}/</span>
              ))}
            </td>
            <td className={tdclasse}>{item.instruction}</td>
            <td className={tdclasse}>{item.quantity}</td>
            <td className={tdclasse}>{item.dosageQuantity}</td>
            <td className={tdclasse}>{item.quantity * item.id.price}</td>

            {button && (
              <td className={tdclasse}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm"
                >
                  <RiDeleteBinLine />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// medicine Dosage table
export function CreateMedicalRecordMedicineDosageTable({
  data = {},
  functions,
  button,
  deleteMedecin,
}) {
  const thclasse = "text-start text-xs font-medium py-3 px-2 whitespace-nowrap";
  const tdclasse = "text-center text-xs py-4 px-2 whitespace-nowrap";

  useEffect(() => { }, []);

  return (
    <table className="table-auto overflow-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclasse}>Item</th>
          <th className={thclasse}>
            Price
            <span className="text-xs font-light ml-1">($)</span>
          </th>

          <th className={thclasse}>Dosage</th>
          <th className={thclasse}>Instraction</th>
          <th className={thclasse}>Quantity</th>
          <th className={thclasse}>Dosage Quantity</th>
          <th className={thclasse}>Total amount</th>
          {button && <th className={thclasse}>Actions</th>}
        </tr>
      </thead>

      <tbody className="overflow-auto">
        {data?.map((item) => (
          <tr
            key={item.id}
            className="border-b overflow-auto border-border text-center hover:bg-greyed transitions"
          >
            <td className={tdclasse}>{item.selectedMedecine.name}</td>
            <td className={tdclasse}>{item.selectedMedecine.price}</td>
            <td className={tdclasse}>
              {item.selectedDosage.length < 1 && <>- - - </>}

              {item.selectedDosage.map((item, index) => (
                <span key={`_medical_record_dosage_${index}`}>
                  {item.name}/
                </span>
              ))}
            </td>
            <td className={tdclasse}>{item.instruction}</td>
            <td className={tdclasse}>{item.quantity}</td>
            <td className={tdclasse}>{item.dosagequantity}</td>
            <td className={tdclasse}>
              {item.quantity * item.selectedMedecine.price}
            </td>

            {button && (
              <td className={tdclasse}>
                <button
                  onClick={(e) => {
                    deleteMedecin();
                    e.preventDefault();
                  }}
                  className="bg-red-600 bg-opacity-5 text-red-600 rounded-lg border border-red-100 py-3 px-4 text-sm"
                >
                  <RiDeleteBinLine />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
