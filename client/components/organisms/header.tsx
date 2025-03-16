import { useAuth } from '@/hooks/useAuth';
import { Bell, BriefcaseBusiness, House, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useReadNotificationQuery } from '@/redux/apis/private/notificationsApi';
import { useGetUserByIdQuery } from '@/redux/apis/private/userApi';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';

const Header = () => {
  const { user, role, id, logout } = useAuth();
  const decodedUserName = encodeURIComponent(user);
  const { data: userDetails } = useGetUserByIdQuery(user);
  const pathname = usePathname();

  // State for dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Queries
  const { data: readNotifications } = useReadNotificationQuery(id);

  // Function to handle notifications click
  const handleNotificationClick = async () => {
    await readNotifications();
  };

  const isActive = (path: string) => pathname.startsWith(path);

  // Calculate the number of unread notifications
  const unreadCount = readNotifications?.count || 0;

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={`w-full flex justify-center items-center shadow-lg h-14 bg-white z-40 fixed gap-5 md:gap-10 ${role === "RECRUITER" ? "hidden" : ""}`}>
      {/* Logo with Dropdown */}
      <div className="relative">
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={toggleDropdown}
        >
          {/* Logo */}
          <div className='w-10 h-10 sm:w-12 sm:h-12 overflow-hidden'>
            <Image
              layout='fill'
              objectFit="cover"
              objectPosition="center"
              className="rounded-full"
              src={`${userDetails?.image || '/images/unkown-person.jpg'}`}
              alt="Logo"
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg w-36 sm:w-48 z-50 hover:bg-gray-100">
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Home Link */}
      <div className={`cursor-pointer p-3 h-full flex flex-col justify-center items-center ${isActive(`/${decodedUserName}`) ? 'text-blue-600' : ''}`}>
        <Link href={`/${decodedUserName}`}>
          <div className="flex flex-col items-center">
            <House size={18} className="sm:w-6 sm:h-6" color={isActive(`/${decodedUserName}`) ? '#1D4ED8' : 'black'} />
            <span className={`text-xs sm:text-sm ${isActive(`/${decodedUserName}`) ? 'text-blue-600' : ''}`}>Home</span>
          </div>
        </Link>
      </div>

      {/* Jobs Link */}
      <div className={`cursor-pointer p-3 h-full flex flex-col justify-center items-center ${isActive('/jobs') ? 'text-blue-600' : ''}`}>
        <Link href="/jobs">
          <div className="flex flex-col items-center">
            <BriefcaseBusiness size={18} className="sm:w-6 sm:h-6" color={isActive('/jobs') ? '#1D4ED8' : 'black'} />
            <span className="text-xs sm:text-sm">Jobs</span>
          </div>
        </Link>
      </div>

      {/* Notifications Link */}
      <div
        className={`cursor-pointer p-3 h-full flex flex-col justify-center items-center relative ${isActive('/notifications') ? 'text-blue-600' : ''}`}
        onClick={handleNotificationClick}
      >
        <Link href="/notifications">
          <div className="flex flex-col items-center">
            <Bell size={18} className="sm:w-6 sm:h-6" color={isActive('/notifications') ? '#1D4ED8' : 'black'} />
            <span className="text-xs sm:text-sm">Notifications</span>
          </div>
        </Link>
        {unreadCount > 0 && (
          <span className='absolute -top-0.5 right-8 sm:right-10 bg-red-500 rounded-full text-xs w-5 h-5 flex justify-center items-center text-white'>
            {unreadCount}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
