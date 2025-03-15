import React from 'react'
import { FaPlus } from 'react-icons/fa'

type AddJobButtonProps = {
  setShowJobForm: (show: boolean) => void
}

const AddJobButton = ({ setShowJobForm }: AddJobButtonProps) =>{
  return (
    <>
     <button
        className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        onClick={() => setShowJobForm(true)}
      >
        <FaPlus className="mr-2" /> 
        Add Job
      </button></>
  )
}

export default AddJobButton