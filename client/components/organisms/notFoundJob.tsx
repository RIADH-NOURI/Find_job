
import React from 'react'

const NotFoundJob = () => {
  return (
    <>
         {
  <div className="md:col-span-2 space-y-8 p-4">
  <div className="text-center">
    {/* Icon */}
    <div className="mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-400 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
        />
      </svg>
    </div>

    {/* Message */}
    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Jobs Found</h2>
    <p className="text-gray-600">We couldn't find any jobs matching your criteria.</p>

    {/* Optional: Add a Button */}
    <button
      className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300"
      onClick={() => window.location.reload()} // Example action
    >
      Refresh Page
    </button>
  </div>
</div>
}
    </>

  )
}

export default NotFoundJob