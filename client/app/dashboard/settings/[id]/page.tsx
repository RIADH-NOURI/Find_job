"use client";

import React, { useState, useEffect } from "react";
import Dashboard from "@/components/layout/dashboard";
import { useGetRecruiterByIdQuery, useUpdateRecruiterMutation } from "@/redux/apis/private/recruiterApi";
import { useParams } from "next/navigation";
import axios from "axios";
import SettingsPage from "@/components/dashboard/templates/settings/settingsForm";
import dynamic from "next/dynamic";
import countries from "@/public/countries.json"
import Loader from "@/components/moleculles/loader";


const UploadImageForm =  dynamic(
  () => import("@/components/organisms/forms/uploadImageForm"),
  { ssr: false }
);

const Page = () => {
  const recruiterId = useParams().id;

  // Fetch recruiter data
  const { data: recruiterData, isLoading } = useGetRecruiterByIdQuery(recruiterId);
  

  const [updateRecruiter] = useUpdateRecruiterMutation();
  const [recruiter, setRecruiter] = useState({
    name: "",
    email: "",
    country: "",
    companyType: "",
    company: "",
    dateOfBirth: "",
    city:"",
    companySize:""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
      const [uploading, setUploading] = useState(false);
      const [showUploadForm, setShowUploadForm] = useState(false);

  

  // Update local state when recruiterData loads
  useEffect(() => {
    if (recruiterData) {
      setRecruiter((prev) => ({
        ...prev,
        name: recruiterData.name || "",
        email: recruiterData.email || "",
        country: recruiterData.country || "",
        companyType: recruiterData.companyType || "",
        company: recruiterData.company || "",
        dateOfBirth: recruiterData.dateOfBirth || "",
        city: recruiterData.city || "",
        companySize: recruiterData.companySize || ""
      }));
    }
  }, [recruiterData]);

  const handleUpdateRecruiterData = async () => {
    try {
      await updateRecruiter({ id: recruiterId, ...recruiter });
      console.log("Update successful", recruiter);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowUploadForm(true); 
    }
  };
  const handleUploadImage = async () => {
    if (selectedFile) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp','image/jpg', 'image/gif'];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Please select a valid image file (JPEG, PNG, WEBP,gif or jpg heic or heif not supported)');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', selectedFile);
  
      setUploading(true);
  
      try {
        const response = await axios.post(
          `https://findjob-4vl9.onrender.com/api/v1/recruiter/${recruiterData.id}/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log(response.data);
        setSelectedFile(null);
        setShowUploadForm(false); 
        alert('Image uploaded successfully!');
      } catch (err) {
        console.error('Image upload failed', err);
        alert('Image upload failed. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };
    const handleCancelUpload = () => {
      setSelectedFile(null);
      setShowUploadForm(false); // Hide the upload form on cancel
    };
  



  if (isLoading) return <div className="w-full h-screen flex items-center justify-center"> <Loader/></div>

  return (
    <Dashboard userData={recruiterData}>
      <SettingsPage
        recruiterData={recruiter}
        setRecruiterData={setRecruiter}
        recruiter={recruiterData}
        onSubmit={handleUpdateRecruiterData}
        countries={countries}
        handleFileChange={handleFileChange}
      />
      {
        showUploadForm && (
          <UploadImageForm
            selectedFile={selectedFile}
            handleUploadImage={handleUploadImage}
            handleCancelUpload={handleCancelUpload}
            uploading={uploading}
          />

        )
      }
    </Dashboard>
  );
};

export default Page;
