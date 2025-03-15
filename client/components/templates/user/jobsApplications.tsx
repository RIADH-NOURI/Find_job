import { JobApplicationUser } from '@/types'
import Avatar from '@mui/material/Avatar';
import { Calendar } from 'lucide-react'
import React from 'react'

type JobApplicationProps = {
    applications: JobApplicationUser[],
    applicationsLoading: boolean,
}

const jobsApplications = ({ applications, applicationsLoading }: JobApplicationProps) => {
  return (
    <>
      {/* Job Applications Section */}
      <div className="col-span-2 bg-white rounded-lg shadow-lg p-6 max-h-full sm:col-span-1">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Job Applications</h3>
        {applicationsLoading ? (
          <div className="text-center py-10 text-gray-500">Loading job applications...</div>
        ) : applications?.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-start flex-col sm:flex-row">
                  <div className="w-full sm:w-auto">
                    <div className="flex items-center gap-3">
                      <Avatar src={`${application.job.recruiter.image || '/images/unkown-person.jpg'}`} className="w-8 h-8 sm:w-10 sm:h-10" />
                      <p className="text-sm text-gray-600 truncate max-w-xs">{application.job.recruiter.company}</p>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mt-2 sm:mt-0 truncate max-w-sm">{application.job.title}</h3>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full mt-3 sm:mt-0
                      ${application.status === 'ACCEPTED' ? 'bg-green-100 text-green-600' : 
                        application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-red-100 text-red-600'}`}
                  >
                    {application.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <p>Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-gray-500">No job applications found.</p>
        )}
      </div>
    </>
  )
}

export default jobsApplications;
