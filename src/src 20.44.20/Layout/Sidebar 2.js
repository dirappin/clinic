import React from 'react';
import { MenuDatas } from '../components/Datas';
import { Link } from 'react-router-dom';

function Sidebar() {
  // active link
  const currentPath = (path) => {
    const currentPath =
      window.location.pathname.split('/')[1] === path.split('/')[1];
    if (currentPath) {
      return path;
    }
    return null;
  };

  return (
    <div className="bg-white  xl:shadow-lg  overflow-auto py-6 px-4 xl:h-screen w-full border-r ">
      <div className='border-b fixed top-0 pt-5 bg-white'>
        <Link to="/" className=''>
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-64 h-24  object-contain"
          />
        </Link>
      </div>
      <div className="flex-colo gap-2 mt-24">
        {MenuDatas.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`
            ${currentPath(item.path) === item.path ? 'bg-text' : ''}
            flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-text`}
          >
            <item.icon
              className={`text-xl text-subMain
            `}
            />
            <p
              className={`text-sm font-medium group-hover:text-subMain ${currentPath(item.path) === item.path
                ? 'text-subMain'
                : 'text-gray-500'
                }`}
            >
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
