import React from 'react';

type FilterCardProps = {
  localFilters: {
    companyType: string;
    company: string;
    salary: number;
    location: string;
    jobType: string;
    experienceLevel: string;
  };
  handleFilterChange: (filter: string, value: string) => void;
  handleSubmitFilters: () => void;
  countries: string[];
  showFilterForm: boolean;
};

const FilterCard = ({ localFilters, handleFilterChange, handleSubmitFilters, countries, showFilterForm }: FilterCardProps) => {
  return (
    <>
      {/* Filter Card */}
      <div
        className={`bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-lg max-h-full min-[1300px]:block ${showFilterForm ? 'block' : 'hidden'}`}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'sticky', top: '80px', zIndex: 40 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 animate-fadeIn">Filters</h3>
        <form onSubmit={handleSubmitFilters} className="space-y-4 animate-slideIn">
          <div>
            <label className="block text-gray-700 text-base font-medium mb-1">Company Type</label>
            <select
              className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
              value={localFilters.companyType}
              onChange={(e) => handleFilterChange('companyType', e.target.value)}
            >
              <option value="">All</option>
              <option value="STARTUP">Startup</option>
              <option value="SMALLBUSINESS">Small Business</option>
              <option value="ENTERPRISE">Enterprise</option>
              <option value="GOVERNMENT">Government</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-base font-medium mb-1">Salary</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
              value={localFilters.salary}
              onChange={(e) => handleFilterChange('salary', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-base font-medium mb-1">Location</label>
            <select
              className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
              value={localFilters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-base font-medium mb-1">Job Type</label>
            <select
              className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
              value={localFilters.jobType}
              onChange={(e) => handleFilterChange('jobType', e.target.value)}
            >
              <option value="">All</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="REMOTE">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-base font-medium mb-1">Experience Level</label>
            <select
              className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
              value={localFilters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
            >
              <option value="">All</option>
              <option value="JUNIOR">Junior</option>
              <option value="MID">Mid</option>
              <option value="SENIOR">Senior</option>
              <option value="INTERN">Intern</option>
              <option value="LEAD">Lead</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 font-medium"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </>
  );
};

export default FilterCard;