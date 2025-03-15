import React, { ReactNode } from 'react';
import Sidebar from '../dashboard/sidebar';
import Avatar from '@mui/material/Avatar';
import { Menu } from 'lucide-react';

interface DashboardProps {
  children: ReactNode;
  userData?: {
    name: string;
    image: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ children, userData }) => {
  return (
    <main className="w-full h-screen">
      {/* Menu icon */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar  />

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
      <div className="flex w-full p-6 gap-6 justify-end">
        <Avatar
          src={userData?.image || '/images/unknown-person.jpg'}
          className="w-16 h-16 rounded-full border-4 border-gray-300 hover:scale-105 transition-transform"
        />
        <div className="text-right">
          <h6 className="text-lg font-extrabold text-gray-800">
            {userData?.name || 'Riadh Nouri'}
          </h6>
          <p className="text-sm text-gray-500">Welcome back!</p>
        </div>
      </div>

          {children}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
