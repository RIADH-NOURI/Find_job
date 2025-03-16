import { Camera, MapPin, Pen } from 'lucide-react';
import Image from 'next/image';
import { User } from '@/types';

type Props = {
  user: User;
  isCurrentUser: boolean;
  handleUpdateUser: React.Dispatch<React.SetStateAction<User>>;
  handleFileChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Profile = ({ user, isCurrentUser, handleUpdateUser, handleFileChange,}: Props) => {
 

  return (
    <>
      {/* Header Section */}
      <div className="relative w-full h-[300px] bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg shadow-lg">
        <label
          htmlFor="profile-upload"
          className={`absolute -bottom-12 left-36 bg-white p-2 rounded-full shadow cursor-pointer z-10 max-[640px]:left-28 ${
            isCurrentUser ? 'block' : 'hidden'
          }`}
        >
          <Camera className={`w-5 h-5 text-blue-600 ${isCurrentUser ? 'block' : 'hidden'}`} />
          <input
  id="profile-upload"
  type="file"
  accept="image/*,image/heic"
  name="image"
  className="hidden"
  onChange={handleFileChange}
/>
        </label>
        <div className="absolute -bottom-16 left-4 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white border border-white shadow-xl">
          <Image
            src={`${user?.image || '/images/unkown-person.jpg'}`}
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-full"
          />
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="mt-20 sm:mt-24 px-4 sm:px-8">
        <div className="flex justify-end w-full mb-4">
          {isCurrentUser && (
            <button
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => handleUpdateUser(user)}
            >
              <Pen size={18} />
              Edit Profile
            </button>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 break-words">{user?.name}</h2>
            <p className="text-base sm:text-lg text-gray-600 mt-2 break-words">{user?.bio}</p>
            <div className="flex items-center gap-1 mt-3">
              <MapPin className="text-gray-500" size={18} />
              <p className="text-gray-600">{user?.country}</p>,
              <p className="text-gray-600">{user?.city}</p>
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default Profile;