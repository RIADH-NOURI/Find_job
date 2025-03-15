"use client"

import React from 'react';
import { X } from 'lucide-react';

type ConfirmFormProps = {
  onClose: () => void;
  handleConfirmApplication: () => void;
  confirmActionMessage: string; 
  confirmAction: string; 
};

const ConfirmForm: React.FC<ConfirmFormProps> = ({ onClose, handleConfirmApplication, confirmActionMessage, confirmAction }) => {
  return (
    <div className='w-[400px] h-[280px] flex flex-col bg-white rounded-lg p-6 shadow-xl' onClick={(e) => e.stopPropagation()}>
      <div className='flex justify-end'>
        <span className='cursor-pointer p-2 rounded-full hover:bg-gray-200 transition duration-300'>
          <X className='cursor-pointer' size={20} onClick={onClose} />
        </span>
      </div>
      <h1 className='text-center text-2xl font-bold mb-4 text-gray-800'>Confirm Action</h1>
      <p className='text-center text-gray-600 mb-6 text-sm'>
        {confirmActionMessage}
      </p>
      <div className='flex gap-3 w-full'>
        <button className='bg-green-500 w-full py-2 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300' onClick={handleConfirmApplication}>
          {confirmAction}
        </button>
        <button className='bg-red-500 w-full py-2 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300' onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmForm;