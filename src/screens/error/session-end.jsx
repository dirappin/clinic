import { Link } from "react-router-dom";
import { MdOutlineTimer } from "react-icons/md";

const SessionEnd = () => {
  return (
    <div className="mi-h-screen w-full">
      <div className="px-4 py-3 max-w-[600px] bg-white border border-blue-gray-100 m-auto mt-20 text-center flex-col flex justify-center">
        <div className="text-5xl flex justify-center py-6 text-center text-blue-gray-800">
          <MdOutlineTimer />
        </div>
        <h1 className="font-bold text-3xl mt-4">Your session expired!</h1>
        <p className="text-sm mt-2">
          You have been logout from the app due to security reasons,and you need
        </p>

        <Link
          className="flex w-full mt-6 items-center justify-center gap-3.5 rounded-lg border border-stroke bg-primary text-black p-4 hover:bg-opacity-80 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
          to={"/login"}
        >
          signin
        </Link>
      </div>
    </div>
  );
};

export default SessionEnd;
