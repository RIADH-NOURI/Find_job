import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react'


type UploadImageForm = {
  handleUploadImage: () => Promise<void>;
  handleCancelUpload: () => void;
  selectedFile : File | null;
  uploading: boolean;
}
const UploadImageForm = ({ handleUploadImage, handleCancelUpload, selectedFile, uploading}: UploadImageForm) => {
  return (
    <>
    {/* Upload Image Form */}
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Upload Profile Image</h3>
                <button onClick={handleCancelUpload} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              {selectedFile && (
                <div className="mb-4">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected Image Preview"
                    width={200}
                    height={200}
                    className="rounded-lg object-cover mx-auto"
                  />
                </div>
              )}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCancelUpload}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadImage}
                  disabled={uploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {uploading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600 mr-2" />
                      Uploading...
                    </div>
                  ) : (
                    'Upload'
                  )}
                </button>
              </div>
            </div>
          </div></>
  )
}

export default UploadImageForm