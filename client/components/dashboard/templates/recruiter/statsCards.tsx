"use client"

import React from 'react'

const statsCards = ({stats,isLoading,isAppsLoading}) => {
  return (
    <>
       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg ${stat.color} text-white transition-transform transform hover:scale-105`}
              >
                <span className="text-6xl mb-4">{stat.icon}</span>
                <h2 className="text-2xl font-semibold">{stat.title}</h2>
                {isLoading || isAppsLoading ? (
                  <p className="text-xl mt-2 animate-pulse">Loading...</p>
                ) : (
                  <p className="text-4xl font-bold mt-2">{stat.count}</p>
                )}
              </div>
            ))}
          </div>
    </>
  )
}

export default statsCards
