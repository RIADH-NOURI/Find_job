"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Jobs } from "@/types";

interface Props {
  isLoading: boolean;
  showForm: boolean;
  jobData: Jobs;
  setJobsData: (data: Jobs) => void;
  onSubmit: (data: Jobs) => Promise<void>;
  onClose: () => void;
  jobsSelectData: string[];
  countries: string[];
}

const JobForm: React.FC<Props> = ({
  isLoading,
  showForm,
  jobData,
  setJobsData,
  countries,
  jobsSelectData,
  onSubmit,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [technologies, setTechnologies] = useState<{ name: string }[]>([]); 
  const [newTech, setNewTech] = useState(""); 
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showMonth, setShowMonth] = useState(false);


  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setJobsData({ ...jobData, salary: value });
    setShowMonth(value > 0);
  };
  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!jobData.title) newErrors.title = "Title is required";
    if (!jobData.description) newErrors.description = "Description is required";
    if (!jobData.jobType) newErrors.jobType = "Job type is required";
    if (!jobData.location) newErrors.location = "Location is required";
    if (!jobData.experienceLevel) newErrors.experienceLevel = "Experience level is required";
    if (!jobData.salary) newErrors.salary = "Salary is required";
    if(!jobData.technologies)newErrors.technologies = "Technologies is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add a new technology
  const addTechnology = () => {
    if (newTech.trim() === "") return; 
    setTechnologies([...technologies, { name: newTech.trim() }]); 
    setNewTech(""); 
  };

  // Remove a technology
  const removeTechnology = (index: number) => {
    const updatedTech = technologies.filter((_, i) => i !== index); 
    setTechnologies(updatedTech);
  };

  // Submit form logic
  const handleSubmit = async () => {
    if (!validateForm()) return; 
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const jobDataWithTech = { ...jobData, technologies };
      await onSubmit(jobDataWithTech); 
      onClose(); 
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-lg w-[600px] border h-[450px] overflow-y-scroll border-gray-300 relative transform transition-transform duration-300 ${
        showForm ? "scale-100" : "scale-90"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center p-2 w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          {isLoading ? "Loading..." : "Experience Form"}
        </h2>
        <button
          className="text-black p-2 rounded-full transition-all duration-300 ease-in hover:bg-slate-300"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <div className="space-y-4">
        {/* Title */}
        <label className="block text-black">
          Title
          <select
            value={jobData.title}
            onChange={(e) => setJobsData({ ...jobData, title: e.target.value })}
            className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black ${
              errors.title ? "border-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="">Select title</option>
            {jobsSelectData.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </label>

        {/* Job Type */}
        <label className="block text-black">
          Job Type
          <select
            value={jobData.jobType}
            onChange={(e) => setJobsData({ ...jobData, jobType: e.target.value })}
            className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black ${
              errors.jobType ? "border-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="">Select job type</option>
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="REMOTE">Remote</option>
          </select>
          {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
        </label>

        {/* Location */}
        <label className="block text-black">
          Location
          <select
            value={jobData.location}
            onChange={(e) => setJobsData({ ...jobData, location: e.target.value })}
            className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black ${
              errors.location ? "border-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="">Select location</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </label>

        {/* Experience Level */}
        <label className="block text-black">
          Experience Level
          <select
            value={jobData.experienceLevel}
            onChange={(e) => setJobsData({ ...jobData, experienceLevel: e.target.value })}
            className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black ${
              errors.experienceLevel ? "border-red-500" : "focus:ring-blue-500"
            }`}
          >
            <option value="">Select experience level</option>
            <option value="INTERN">Intern</option>
            <option value="JUNIOR">Junior</option>
            <option value="MID">Mid</option>
            <option value="SENIOR">Senior</option>
            <option value="LEAD">Lead</option>
          </select>
          {errors.experienceLevel && (
            <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>
          )}
        </label>

        {/* Salary */}
        <label className="block text-black">
          Salary
          <div className="relative">
      <input
        type="number"
        placeholder="Enter salary"
        value={jobData.salary}
        onChange={handleSalaryChange}
        className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black ${
          jobData.salary && jobData.salary <= 0 ? "border-red-500" : "focus:ring-blue-500"
        }`}
      />
      {showMonth && <span className="absolute right-20 top-2 text-black">/month</span>}
    </div>
          {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
        </label>

        {/* Description */}
        <label className="block text-black">
          Description
          <textarea
            placeholder="Describe your role and achievements"
            value={jobData.description}
            onChange={(e) => setJobsData({ ...jobData, description: e.target.value })}
            className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black ${
              errors.description ? "border-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </label>

        {/* Technologies */}
        <label className="block text-black">
          Add Technologies
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              placeholder="Enter a technology"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                <span>{tech.name}</span>
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </label>
      </div>

      {/* Submit Button */}
      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating job..." : "Create Job"}
      </button>
    </div>
  );
};

export default JobForm;