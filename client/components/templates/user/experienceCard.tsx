import { Briefcase, Pen, Trash2 } from 'lucide-react'
import React from 'react'
import {userExperience } from '@/types'
import { User } from '@/types'

type ExperienceCardProps = {
  experiences: userExperience[]
  experiencesLoading: boolean
  user: User
  isCurrentUser: boolean
  handleCreateExperience: (user: User) => () => void
  handleShowConfirmForm: (id: string) => void
}

const ExperienceCard = ({
  experiences,
  experiencesLoading,
  user,
  isCurrentUser,
  handleCreateExperience,
  handleShowConfirmForm
}: ExperienceCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 ${isCurrentUser ? 'col-span-1' : 'col-span-3'}`}>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Experiences</h3>

      {experiencesLoading ? (
        <p className="text-center py-6 sm:py-10 text-gray-500">Loading experiences...</p>
      ) : experiences?.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 sm:p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Briefcase className="text-blue-600" size={20} />
                  <h2 className="text-sm sm:text-lg font-semibold text-gray-800 truncate">{exp.title}</h2>
                </div>

                {isCurrentUser && (
                  <button
                    onClick={() => handleShowConfirmForm(exp.id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                <strong>Company:</strong> {exp.company}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <strong>Duration:</strong> {exp.startDate} - {exp.endDate}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">{exp.description}</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                <strong>Experience Level:</strong> {exp.experienceLevel}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                <strong>Location:</strong> {exp.location || 'No location'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-6 sm:py-10 text-gray-500">No experiences found.</p>
      )}

      {isCurrentUser && (
        <div className="mt-4 sm:mt-6">
          <button
            className="w-full flex justify-center items-center gap-2 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={handleCreateExperience(user)}
          >
            <Pen size={18} />
            Add Experience
          </button>
        </div>
      )}
    </div>
  )
}

export default ExperienceCard
