import { X } from "lucide-react";
import { useState } from "react";
import Loader from "../../moleculles/loader";
import { User } from "@/types";


interface userFormProps {
  isLoading: boolean;
  showForm: boolean;
  userData: User;
  setUserData: (data: User) => void;
  onSubmit: (data: User) => Promise<void>;
  onClose: () => void;
}

const UserForm :React.FC<userFormProps>=({ 
    isLoading,
  showForm, 
  userData, 
  setUserData, 
  onSubmit, 
  onClose, 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async () => {
    if (isSubmitting) return; 
    setIsSubmitting(true); 

    try {
      await onSubmit(userData); 
      onClose(); 
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div 
      className={`bg-white p-6 rounded-2xl shadow-lg w-[600px] h-[600px] overflow-auto border border-gray-300 relative transform transition-transform duration-300 ${showForm ? 'scale-100' : 'scale-90'}`} 
      onClick={(e) => e.stopPropagation()}
    >
       <div className="flex justify-between items-center p-2 w-full ">
     <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        {isLoading ? 'Loading...' : 'userInformation'}
      </h2>
      <button className="text-black p-2 rounded-full transition-all duration-300 ease-in hover:bg-slate-300">< X size={20} onClick={onClose} /></button>
     </div>
     {
      isLoading ?
      <div className="w-full h-full flex items-center justify-center">
        <Loader/>
      </div>
      : <div className="space-y-4">
      <label className="block text-black">
        Name
        <input 
          type="text" 
          placeholder="Enter name" 
          value={userData.name} 
          onChange={(e) => {
            // Normalize the input value
            const normalizedValue = e.target.value
              .replace(/\s+/g, ' ') 
              .trim();
            setUserData({ ...userData, name: normalizedValue });
          }}
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
        />
      </label>
      <label className="block text-black">
        bio
        <textarea 
          placeholder="Enter email" 
          value={userData.bio} 
          onChange={(e) => setUserData({ ...userData, bio: e.target.value })} 
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
        />
      </label>
      <label className="block text-black">
        country
        <input 
          type="text" 
          placeholder="Enter country" 
          value={userData.country} 
          onChange={(e) => setUserData({ ...userData, country: e.target.value })} 
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
        />
      </label>
      <label className="block text-black">
        date of birth
        <input 
        type="date"
          value={new Date(userData.dateOfBirth).toISOString().split('T')[0]} 
          onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })} 
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
        />
      </label>
      <label className="block text-black">
        city
        <input 
        type="text"
          value={userData.city} 
          onChange={(e) => setUserData({ ...userData, city: e.target.value })} 
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
        />
      </label>
      <label className="block text-black">
        status
        <input 
        type="text"
          value={userData.status}  
          onChange={(e) => setUserData({ ...userData, status: e.target.value })} 
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
        />
      </label>
    </div>

     }
      <button 
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer" 
        onClick={handleSubmit}
        disabled={isSubmitting} 
      >
        {isSubmitting ? 'Submitting...' : 'register'}
      </button>

    </div>
  );
};

export default UserForm;