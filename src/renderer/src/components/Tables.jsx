import React, { useEffect, useRef, useState } from "react";
import { MenuSelect } from "./Form";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit, FiEye } from "react-icons/fi";
import {
  RiCompassLine,
  RiDeleteBin6Line,
  RiDeleteBinLine,
} from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import Loader from "./common/Loader";
import NetworkError from "./error/networkError.jsx";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { backendBaseUrl } from "../constant";
import { MdClose } from "react-icons/md";
import EmptyResult from "./common/EmptyResult";
import { birthYearFormater, formatDate } from "../util/formatDate";
import FetchError from "./error/FetchError.jsx";
import ServiceTableItem from "./ServiceTableItem";
import { checkAppointmentStatus } from "../util/formatDate.js";
import { useRecoilValue } from "recoil";
import user from "../state/user.js";
import { cn } from "../util/cn.js";
import InvoiceItem from "./InvoiceItem.jsx";
import PayementItem from "./PayementItem.jsx";
import PatientListItem from "./PatientListItem.jsx";

const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

export function Transactiontable({ data, action, functions }) {
  const { patientId } = useParams();
  const {
    loading,
    mutate,
    data: payements,
    error,
  } = useSWR(`${backendBaseUrl}medical-record/invoices/all/${patientId}`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

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
    <div>
      {loading && <Loader className={"h-56"} />}
      {payements && (
        <table className="table-auto w-full">
          {error && (
            <FetchError
              action={mutate}
              loading={loading}
              description={"Failed to load recors"}
            />
          )}
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
      )}
    </div>
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
        navigate(`/invoices/preview/${item._id}`);
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
            key={item._id}
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
  const {
    data: medcines,
    loading,
    error,
    mutate,
  } = useSWR(backendBaseUrl + "pharmacy/" + "find-all-medcine", {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });
  const [searchString, setSearchString] = useState("");
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
    <div>
      <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
        <div className="md:col-span-5 mb-4 grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-2">
          <input
            onChange={(e) => setSearchString(e.target.value)}
            type="text"
            placeholder='Search "paracetamol"'
            className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
          />
        </div>
      </div>
      <table className="table-auto w-full">
        <thead className="bg-dry rounded-md overflow-hidden">
          <tr>
            <th className={thclass}>Name</th>
            <th className={thclass}>
              Price <span className="text-xs font-light">($)</span>
            </th>
            <th className={thclass}>Quantity</th>
            <th className={thclass}>
              Total price<span className="text-xs font-light">($)</span>
            </th>
            <th className={thclass}>Created At</th>
            <th className={thclass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medcines &&
            medcines
              .filter((item) =>
                item.name.toUpperCase().includes(searchString.toUpperCase())
              )
              .map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-border hover:bg-greyed transitions"
                >
                  <td className={tdclass}>
                    <h4 className="text-sm font-medium">{item?.name}</h4>
                  </td>
                  <td className={`${tdclass} font-semibold`}>{item?.price}</td>
                  <td className={tdclass}>{item?.quantity}</td>
                  <td className={tdclass}>{item?.price * item?.quantity}</td>
                  <td className={tdclass + "text-gray-600"}>
                    {formatDate(item.createdAt)}
                  </td>
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
      {data && data.length < 1 && (
        <EmptyResult disableButton={true} lable={"No medicine yet."} />
      )}
      {error && (
        <FetchError
          action={() => mutate()}
          description={"Something went wrong."}
          loading={loading}
        />
      )}
    </div>
  );
}

// service table
export function ServiceTable({ mutate: reload }) {
  const {
    data: servicesData,
    loading,
    error,
    mutate,
  } = useSWR(`${backendBaseUrl}service`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    reload.current = mutate;
  }, []);

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
              Price <span className="text-xs font-light">(Dollars)</span>
            </th>
            <th className={thclass}>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && <Loader className={"h-56"} />}
          {servicesData &&
            servicesData
              .filter((item) =>
                item.name.toUpperCase().includes(searchValue.toUpperCase())
              )
              .map((item, index) => (
                <ServiceTableItem mutate={mutate} key={index} item={item} />
              ))}
        </tbody>
      </table>
      {error && (
        <FetchError
          description={"Failed to load services"}
          action={() => mutate()}
        />
      )}
    </div>
  );
}

// patient table
// patient table
export function PatientTable() {
  const [name, setName] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const searchInput = useRef();
  const [showNotFountResult, setShowNotFountResult] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    `${backendBaseUrl}patient/?skip=${1}`,
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
    }
  );

  const thclasse = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";

  const searchPatient = async (e) => {
    e.preventDefault();
    if (name.trim("") === " ") return;

    if (searchInput.current.value.trim() === "") {
      searchInput.current.focus();
      return;
    }
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
      className="bg-white min-h-screen my-8 rounded-xl border-[1px] border-border p-5"
    >
      {data && data.patients.length <  1 && <EmptyResult disableButton lable={'No patients yet.'} />}
      <div className="w-full overflow-x-scroll bg-white">
        {data && data.patients.length > 0 &&
          <form
            onSubmit={searchPatient}
            className="grid mb-10 lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2"
          >
            <input
              ref={searchInput}
              searchInput
              defaultChecked={name}
              type="text"
              placeholder='Search "Patients"'
              className="h-14 text-sm focus:border-gray-400 text-main rounded-md bg-dry border border-border px-4"
            />

            {searchResult.length > 0 &&
              <button
                type="button"
                onClick={() => {
                  setSearchResult([]);
                  setName("");
                  searchInput.current.value = "";
                }}
                disabled={name.trim("") === " "}
                className="max-w-16 cursor-pointer text-gray-700 active:bg-gray-100 h-full bg-gray-50  flex items-center justify-center rounded-md border"
              >
                <MdClose />
              </button>
            }

            {searchResult.length < 1 &&
              <button
                disabled={name.trim("") === " "}
                className="max-w-16 cursor-pointer text-gray-700 active:bg-gray-100 h-full bg-gray-50  flex items-center justify-center rounded-md border"
              >
                {searchLoading && <span className="text-[10px]">...loading</span>}

                {!searchLoading && (
                  <IoSearchOutline className="text-md " />
                )}
              </button>
            }
          </form>
        }
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclasse}>#</th>
              <th className={thclasse}>Patient</th>
              <th className={thclasse}>Created At</th>
              <th className={thclasse}>Gender</th>
              <th className={thclasse}>Age</th>
              <th className={thclasse}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              searchResult.length < 1 &&
              !showNotFountResult &&
              data.patients.map((item, index) => (
                <PatientListItem
                  key={item._id}
                  item={item}
                  index={index}
                  mutate={mutate}
                />
              ))}

            {/* search result */}
            {searchResult.length > 0 &&
              !showNotFountResult &&
              searchResult.map((item, index) => (
                <PatientListItem
                  key={item._id}
                  item={item}
                  index={index}
                  mutate={mutate}
                />
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
        +         <h4 className="text-sm font-medium">{item.user.title}</h4>
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
export function AgentTable({ functions, search = "", url = "user/find/all" }) {
  const { data, error, isLoading } = useSWR(`${backendBaseUrl}${url}`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });
  const userAtom = useRecoilValue(user);
  const navigate = useNavigate();

  const DropDown1 = [
    {
      title: "View",
      icon: FiEye,
      onClick: (id) => {
        navigate("/agents/preview/" + id._id);
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
              {userAtom.role === "admin" ? (
                <th className={thclass}>Salary</th>
              ) : (
                ""
              )}
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
                    {userAtom.role === "admin" && (
                      <td className={tdclass}>{agent.salary}</td>
                    )}
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
  const { patientId } = useParams();
  const {
    data: Appointments,
    loading,
    error,
    mutate,
  } = useSWR(backendBaseUrl + `appointments/all/${patientId}`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  return (
    <div>
      {error && (
        <FetchError
          action={() => mutate()}
          description={"Failed To Load Data"}
        />
      )}
      {Appointments && Appointments.length < 1 && (
        <EmptyResult description={"No Record Yet"} disableButton />
      )}
      {loading && <Loader />}
      {!loading && Appointments && Appointments.length > 0 && !error && (
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
            {Appointments &&
              Appointments.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-border hover:bg-greyed transitions"
                >
                  <td className={tdclass}>
                    <p className="text-xs">{formatDate(item.visitDate)}</p>
                  </td>
                  <td className={tdclass}>
                    <h4 className="text-xs font-medium">
                      {item.doctor.firstName + " " + item.doctor.secondName}
                    </h4>
                    <p className="text-xs mt-1 text-textGray">
                      {item.doctor.phoneNumber}
                    </p>
                  </td>
                  <td className={tdclass}>
                    <span
                      className={cn("text-sm px-4 py-1 rounded-full", {
                        "bg-green-300 text-gray-800 ":
                          checkAppointmentStatus(item.visitDate) === "pending",
                        "bg-red-300 text-gray-800 ":
                          checkAppointmentStatus(item.visitDate) === "passed",
                      })}
                    >
                      {checkAppointmentStatus(item.visitDate)}
                    </span>
                  </td>
                  <td className={tdclass}>
                    <p className="text-xs">{`${item.startTime}`}</p>
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
      )}
    </div>
  );
}

// appointment table
export function AgentAppointmentTable({ data, functions, doctor }) {
  const userData = useRecoilValue(user);
  const {
    data: Appointments,
    loading,
    error,
    mutate,
  } = useSWR(backendBaseUrl + `appointments/agent/${userData._id}`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  return (
    <div>
      {error && (
        <FetchError
          action={() => mutate()}
          description={"Failed To Load Data"}
        />
      )}
      {Appointments && Appointments.length < 1 && (
        <EmptyResult description={"No Record Yet"} disableButton />
      )}
      {loading && <Loader />}
      {!loading && Appointments && Appointments.length > 0 && !error && (
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
            {Appointments &&
              Appointments.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-border hover:bg-greyed transitions"
                >
                  <td className={tdclass}>
                    <p className="text-xs">{formatDate(item.visitDate)}</p>
                  </td>
                  <td className={tdclass}>
                    <h4 className="text-xs font-medium">
                      {item.doctor.firstName + " " + item.doctor.secondName}
                    </h4>
                    <p className="text-xs mt-1 text-textGray">
                      {item.doctor.phoneNumber}
                    </p>
                  </td>
                  <td className={tdclass}>
                    <span
                      className={cn("text-sm px-4 py-1 rounded-full", {
                        "bg-green-300 text-gray-800 ":
                          checkAppointmentStatus(item.visitDate) === "pending",
                        "bg-red-300 text-gray-800 ":
                          checkAppointmentStatus(item.visitDate) === "passed",
                      })}
                    >
                      {checkAppointmentStatus(item.visitDate)}
                    </span>
                  </td>
                  <td className={tdclass}>
                    <p className="text-xs">{`${item.startTime}`}</p>
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
      )}
    </div>
  );
}

// payment table
export function PaymentTable({ data, functions, doctor }) {
  const { patientId } = useParams();
  const {
    loading,
    mutate,
    data: payements,
    error,
  } = useSWR(`${backendBaseUrl}medical-record/payements/${patientId}`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  return (
    <div>
      {error && (
        <FetchError
          loading={loading}
          description={"Failed to get records"}
          action={() => mutate()}
        />
      )}
      {loading && <Loader className={"h-48"} />}
      {payements && payements.length < 1 && (
        <EmptyResult lable={"No records yet"} disableButton />
      )}

      {payements && payements.length > 0 && (
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclass}>Date</th>
              <th className={thclass}>{doctor ? "Patient" : "Doctor"}</th>
              <th className={thclass}>Amount</th>
              <th className={thclass}>Method</th>
              <th className={thclass}>Action</th>
            </tr>
          </thead>
          <tbody>
            {payements.map((item) => (
              <PayementItem key={item._id} item={item} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// invoice used table
export function InvoiceUsedTable() {
  const { patientId } = useParams();
  const {
    loading,
    mutate,
    data: invoices,
    error,
  } = useSWR(`${backendBaseUrl}medical-record/invoices/all/${patientId}`, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  return (
    <div>
      {loading && <Loader />}
      {error && <FetchError loading={loading} action={() => mutate()} />}
      {invoices && invoices.length < 1 && (
        <EmptyResult disableButton lable={"No invoices yet"} />
      )}
      {invoices && invoices.length > 0 && (
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclass}>Invoice ID</th>
              <th className={thclass}>Created Date</th>
              <th className={thclass}>Amount</th>
              <th className={thclass}>Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices &&
              invoices.map((item) => (
                <InvoiceItem item={item} key={item._id} />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// invoice table
export function InvoiceProductsTable({ data }) {
  return (
    <table className="w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thclass}>Item</th>
          <th className={thclass}>
            Item Price
            <span className="text-xs font-light ml-1">($)</span>
          </th>

          <th className={thclass}>id</th>
        </tr>
      </thead>

      <tbody>
        {data?.map((item) => (
          <tr
            key={item._id}
            className="border-b border-border hover:bg-greyed transitions"
          >
            <td className={`${tdclass}  font-medium`}>{item.name}</td>
            <td className={`${tdclass} text-xs`}>{item.price}</td>
            <td className={`${tdclass} text-xs`}>{item._id}</td>
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
