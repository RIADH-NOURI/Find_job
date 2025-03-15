import { useState } from "react";
import { X } from "lucide-react";
import { userExperience } from "@/types";

interface ExperienceFormProps {
  isLoading: boolean;
  showForm: boolean;
  experienceData: userExperience;
  setExperienceData: (data: userExperience) => void;
  onSubmit: (data: userExperience) => Promise<void>;
  onClose: () => void;
}
const ExperienceForm: React.FC<ExperienceFormProps> = ({
  isLoading,
  showForm,
  experienceData,
  setExperienceData,
  onSubmit,
  onClose,
})=> {
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async () => {

    if (!experienceData.title || !experienceData.company || !experienceData.startDate || !experienceData.endDate || !experienceData.experienceLevel || !experienceData.description || !experienceData.location) {
     alert("Please fill in all required fields");
      return;
    }
    if (isSubmitting) return; 
    setIsSubmitting(true); 

    try {
      await onSubmit(experienceData); 
      onClose(); 
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div 
      className={`bg-white p-6 rounded-2xl shadow-lg w-[600px] border h-[450px] overflow-y-scroll border-gray-300 relative transform transition-transform duration-300 ${showForm ? 'scale-100' : 'scale-90'}`} 
      onClick={(e) => e.stopPropagation()}
    >
     <div className="flex justify-between items-center p-2 w-full">
     <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        {isLoading ? 'Loading...' : 'experienceForm'}
      </h2>
      <button className="text-black p-2 rounded-full transition-all duration-300 ease-in hover:bg-slate-300">< X size={20} onClick={onClose} /></button>
     </div>
      <div className="space-y-4">
        {/* Title */}
        <label className="block text-black">
          Title
          <input 
            type="text" 
            placeholder="Enter title (e.g., Software Engineer)" 
            value={experienceData.title} 
            onChange={(e) => setExperienceData({ ...experienceData, title: e.target.value })} 
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
          />
        </label>

        {/* Company */}
        <label className="block text-black">
          Company
          <input 
            type="text" 
            placeholder="Enter company name" 
            value={experienceData.company} 
            onChange={(e) => setExperienceData({ ...experienceData, company: e.target.value })} 
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
          />
        </label>
         {/* Location*/}
         <label className="block text-black">
          Location
          <input 
            type="text" 
            placeholder="Enter company name" 
            value={experienceData.location} 
            onChange={(e) => setExperienceData({ ...experienceData, location: e.target.value })} 
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
          />
        </label>

        {/* Start Date */}
        <label className="block text-black">
          Start Date
          <input 
            type="date" 
            value={experienceData.startDate} 
            onChange={(e) => setExperienceData({ ...experienceData, startDate: e.target.value })} 
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
          />
        </label>
        
        {/* End Date */}
        <label className="block text-black">
          End Date
          <input 
            type="date" 
            value={experienceData.endDate} 
            onChange={(e) => setExperienceData({ ...experienceData, endDate: e.target.value })} 
            className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500 ${
              !experienceData.startDate ? 'bg-gray-200 cursor-not-allowed' : ''
            }`}
            disabled={!experienceData.startDate} 
          />
        </label>
         {/* Experience Level */}
         <label className="block text-black">
          Experience Level
         <select value={experienceData.experienceLevel} onChange={(e) => setExperienceData({ ...experienceData, experienceLevel: e.target.value })} className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500">
          <option value="">Select experience level</option>
          <option value="JUNIOR">JUNIOR</option>
          <option value="INTERN">INTERN</option>
          <option value="SENIOR">SENIOR</option>
          <option value="MANAGER">MANAGER</option>
          <option value="DIRECTOR">DIRECTOR</option>
         </select>
        </label>

        {/* Description */}
        <label className="block text-black">
          Description
          <textarea
            placeholder="Describe your role and achievements" 
            value={experienceData.description} 
            onChange={(e) => setExperienceData({ ...experienceData, description: e.target.value })} 
            className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-500 
              `}          />
        </label>
      </div>

      {/* Submit Button */}
      <button 
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer" 
        onClick={handleSubmit}
        disabled={isSubmitting} 
      >
        {isSubmitting ? "Submitting..." : "register"}
      </button>


    </div>
  );
};

export default ExperienceForm;