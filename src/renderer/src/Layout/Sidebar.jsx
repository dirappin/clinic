import React, { useEffect } from "react";
import { MenuDatas } from "../components/Datas";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import user from "../state/user";
import useEntryCheckerRole from "../util/hooks/entryCheckerRoleRestriction";
import { CiLock } from "react-icons/ci";
import image from '../../public/images/logo.png';


const MenuElement = ({ item, index }) => {
  const userData = useRecoilValue(user);
  const currentPath = (path) => {
    const currentPath =
      window.location.pathname.split("/")[1] === path.split("/")[1];
    if (currentPath) {
      return path;
    }
    return null;
  };

  return item.permission.includes(userData.role) ||
    item.permission[0] === "all" ? (
    <Link
      to={item.path}
      key={index}
      className={`
  ${currentPath(item.path) === item.path ? "bg-text" : ""}
  flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-text`}
    >
      <item.icon
        className={`text-xl text-subMain
  `}
      />
      <p
        className={`text-sm font-medium group-hover:text-subMain ${currentPath(item.path) === item.path
          ? "text-subMain"
          : "text-gray-500"
          }`}
      >
        {item.title}
      </p>
    </Link>
  ) : (
    <></>
  );
};

function Sidebar() {
  // active link
  const userData = useRecoilValue(user);
  const { verifyRole } = useEntryCheckerRole();

  useEffect(() => {
    verifyRole();
  }, []);

  return userData.role !== "entry-checker" ? (
    <div className="bg-white  xl:shadow-lg  overflow-auto py-6 px-4 xl:h-screen w-full border-r ">
      <div className="w-full fixed top-0 h-9 bg-white"></div>
      <div className="border-b sticky top-0  bg-white">
        <Link to="/" className="">
          <img
            src={image}
            alt="logo"
            className=" lg:w-44 w-64 h-24  object-contain"
          />
        </Link>
      </div>

      <div className="flex-colo gap-2 mt-24">
        {MenuDatas.map((item, index) => (
          <MenuElement index={index} item={item} />
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-full lg:hidden flex items-center justify-center  flex-col gap-3">
      <div className="">
        <h1 className="text-gray-700">Unavailable</h1>
        <div className="w-full flex justify-center mt-3">
          <CiLock className="text-8xl text-gray-600" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
