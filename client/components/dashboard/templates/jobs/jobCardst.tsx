import React from "react";
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaBriefcase } from "react-icons/fa";
import { Jobs } from "@/types";
import { Trash2 } from "lucide-react";
import { red } from "@mui/material/colors";

interface JobCardProps {
  job: Jobs; // Expecting a single job object, not an array
  handleShowConfirmForm : (jobId: number) => void
}

const JobCard : React.FC<JobCardProps> = ({ job, handleShowConfirmForm }) => {


  return (
    <div
      className="bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 relative"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header Section */}
      <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
        <p className="text-white text-opacity-90 text-sm">{job.description}</p>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>
      <div className="w-full flex justify-end pr-5 pt-1"><Trash2 onClick={() => {
        handleShowConfirmForm(job.id)
        
      }} className="cursor-pointer border-2 text-white bg-red-500 p-2 rounded-full hover:text-red-600 hover:bg-white transition-colors duration-300" size={40}/></div>

      {/* Body Section */}
      <div className="pl-6 pt-0 pb-5">
        {/* Technologies Section */}
        {job.technologies && job.technologies.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-300"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Job Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-blue-500 text-lg" />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="text-gray-800 font-semibold">{job.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaDollarSign className="text-green-500 text-lg" />
            <div>
              <p className="text-sm text-gray-600">Salary</p>
              <p className="text-gray-800 font-semibold">{job.salary} €</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="text-purple-500 text-lg" />
            <div>
              <p className="text-sm text-gray-600">Job Type</p>
              <p className="text-gray-800 font-semibold">{job.jobType}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-orange-500 text-lg" />
            <div>
              <p className="text-sm text-gray-600">Experience Level</p>
              <p className="text-gray-800 font-semibold">{job.experienceLevel}</p>
            </div>
          </div>
        </div>

        {/* Posted and Updated Dates */}
        <div className="text-sm text-gray-500">
          <p>Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
          <p>Last updated: {new Date(job.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;