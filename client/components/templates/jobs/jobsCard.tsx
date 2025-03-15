import Avatar from "@mui/material/Avatar";
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaBriefcase, FaHeart } from "react-icons/fa";
import { Jobs } from "@/types";

type JobsCardProps = {
  Jobsdata: Jobs[];
  handleShowConfirmForm: (jobId: number) => void;
};

const JobsCard = ({ Jobsdata, handleShowConfirmForm }: JobsCardProps) => {
  return (
    <div className="col-span-2 space-y-6 p-4">
      {Jobsdata?.jobs?.map((job) => (
        <div
          key={job.id}
          className="relative bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 overflow-hidden group"
          style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Company Info */}
          <div className="flex items-center space-x-4 mb-4">
            <Avatar src={job.recruiter.image || '/images/unkown-person.jpg'} sx={{ width: 50, height: 50 }} />
            <div>
              <h3 className="text-lg font-bold text-gray-900">{job.recruiter.company}</h3>
              <span className="text-blue-600 text-xs font-medium uppercase">{job.recruiter.companyType}</span>
            </div>
          </div>

          {/* Job Title */}
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {job.title}
          </h2>

          {/* Job Description */}
          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm">{job.description}</p>

          {/* Job Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-500 text-lg" />
              <p className="text-gray-800 font-medium text-sm">{job.location},{job.recruiter.city}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaDollarSign className="text-green-500 text-lg" />
              <p className="text-gray-800 font-medium text-xs">${job.salary} /month</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-purple-500 text-lg" />
              <p className="text-gray-800 font-medium text-sm">{job.jobType}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaBriefcase className="text-orange-500 text-lg" />
              <p className="text-gray-800 font-medium text-sm">{job.experienceLevel}</p>
            </div>
          </div>

          {/* Technologies List */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Technologies
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {job.technologies && job.technologies.length > 0 ? (
              job.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm hover:shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-transparent"
                >
                  {tech.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No technologies listed</span>
            )}
          </div>

          {/* Apply Button */}
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-base font-semibold tracking-wide hover:scale-105 transition-transform duration-300 hover:shadow-lg"
            onClick={() => handleShowConfirmForm(job.id)}
          >
            Apply Now
          </button>

          {/* Decorative Element */}
          <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
            {job.recruiter.companySize} employees
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsCard;