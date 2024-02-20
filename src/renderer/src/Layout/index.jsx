import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Authorization from '../components/hoc/authorization';

function index({ children, title }) {
  return (
    <Authorization>
      <div className="bg-dry xl:h-screen flex-colo ">
        <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
          <div className="col-span-2 xl:block hidden">
            <Sidebar />
          </div>
          <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
            <Header title={title} />
            <div className="xs:px-8 px-2 pt-24">{children}</div>
          </div>
        </div>
      </div>
    </Authorization>
  );
}

export default index;
