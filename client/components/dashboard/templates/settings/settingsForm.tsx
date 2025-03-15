"use client";

import React, { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import Image from 'next/image';
import { Recruiter } from '@/types';

type settingsFormProps = {
  recruiterData: Recruiter;
  setRecruiterData: (value : Recruiter
  ) => void;
  recruiter: Recruiter;
  onSubmit: (data: Recruiter) => Promise<void>;
  countries: string[];
  handleFileChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SettingsPage : React.FC<settingsFormProps> = ({
    recruiterData,
    setRecruiterData,
    recruiter,
    onSubmit,
    countries,
    handleFileChange
  
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
        onSubmit(recruiterData);
        setIsSubmitting(true);
        alert("update recruiter data successfully")
    } catch (error) {
        console.log(error);
        setIsSubmitting(false);
    }
    finally {
        setIsSubmitting(false);
    }
  };


  return (
      <div className='min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6'>
            <h1 className='text-2xl font-bold text-white'>Recruiter Settings</h1>
            <p className='text-sm text-blue-200'>Manage your profile and account settings</p>
          </div>

          {/* Profile Picture Section */}
          <div className='p-6 border-b border-gray-200'>
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <Image
                  src={recruiter?.image || '/images/riadh.jpg'}
                  alt='Profile'
                  width={100}
                 height={60}
                 className='object-cover rounded-full'
                />
                <label
                  htmlFor='profile-upload'
                  className='absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer'
                >
                  <Camera className='w-5 h-5 text-blue-600' />
                  <input
                    id='profile-upload'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-800'>{recruiter?.name}</h2>
                <p className='text-sm text-gray-600'>{recruiter?.email}</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className='p-6 space-y-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Name</label>
                <input
                  type='text'
                  value={recruiterData.name}
                  onChange={(e) => setRecruiterData({...recruiterData, name: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                  type='email'
                  value={recruiterData.email}
                  onChange={(e) => setRecruiterData({...recruiterData, email: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Company</label>
                <input
                  type='text'
                  value={recruiterData.company}
                  onChange={(e) => setRecruiterData({ company: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Company Type</label>
                <select
                  value={recruiterData.companyType}
                  onChange={(e) => setRecruiterData({...recruiterData, companyType: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='STARTUP'>Startup</option>
                  <option value='ENTERPRISE'>Enterprise</option>
                  <option value='SMALLBUSINESS'>Small Business</option>
                  <option value='GOVERNMENT'>Government</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Company Type</label>
                <select
                  value={recruiterData.companySize}
                  onChange={(e) => setRecruiterData({...recruiterData, companySize: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value="">select company size</option>
                  <option value='1-10'>1-10 employees</option>
                  <option value='10-50'>10-50 employees</option>
                  <option value='50-250'>50-250 employees</option>
                  <option value='+250'>+250 employees</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>City</label>
                <input
                  type='text'
                  value={recruiterData.city}
                  onChange={(e) => setRecruiterData({...recruiterData, city: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Country</label>
                <select
                  value={recruiterData.country}
                  onChange={(e) => setRecruiterData({...recruiterData, country: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {
                    countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
                <input
                  type='date'
                  value={recruiterData.dateOfBirth}
                  onChange={(e) => setRecruiterData({...recruiterData, dateOfBirth: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            {/* Save Button */}
            <div className='flex justify-end'>
              <button
                onClick={handleSubmit}
                className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300'
              >
                <Save className='w-5 h-5 mr-2' />
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SettingsPage;