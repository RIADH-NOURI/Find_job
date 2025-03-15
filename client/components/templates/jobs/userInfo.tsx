import Avatar from '@mui/material/Avatar';
import { User } from '@/types';
import React from 'react';

const UserInfo: React.FC<{ userData: User, jobAppCount: number, experiencesCount: number }> = ({ userData , jobAppCount , experiencesCount}) => {
  return (
    <>
      {/* Right Sidebar - User Info */}
      <div className="bg-gradient-to-br from-white to-gray-100 p-4 sm:p-6 rounded-2xl shadow-lg h-auto sm:h-[400px] transition-transform transform hover:scale-105 duration-500">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fadeIn">User Info</h3>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slideIn">
          <Avatar src={userData?.image || '/images/unkown-person.jpg'} sx={{ width: 60, height: 60 }} />
          <div className="text-center sm:text-left">
            <p className="text-lg sm:text-lg md:text-sm lg:text-sm xl:text-base font-semibold text-gray-800">{userData?.name}</p>
            <p className="text-gray-500 text-sm sm:text-base">{userData?.status || 'Software Engineer'}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
          <p className="text-gray-700 text-sm sm:text-base">
            <span className="font-semibold">your applications:</span> {jobAppCount}
          </p>
          <p className="text-gray-700 text-sm sm:text-base">
            <span className="font-semibold">your experiences:</span> {experiencesCount}
          </p>
        </div>

        {/* Animated Badge */}
        <div className="mt-6 sm:mt-8">
          <span className="inline-block bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full animate-pulse">
            Active User
          </span>
        </div>
      </div>
    </>
  );
};

export default UserInfo;