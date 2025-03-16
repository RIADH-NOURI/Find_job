"use client";


import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  useGetUserByIdQuery,
  useGetApplicationByUserIdQuery,
  useUpdateUserMutation,
} from "@/redux/apis/private/userApi";
import { useParams } from "next/navigation";
import {
  useCreateExperiencesMutation,
  useGetExperiencesByUserQuery,
  useDeleteExperiencesMutation,
} from "@/redux/apis/private/experiencesUserApi"
import ProfileInfo from "@/components/templates/user/profile";
import Experiences from "@/components/templates/user/experienceCard";
import JobsApplications from "@/components/templates/user/jobsApplications";
import Header from "@/components/organisms/header";
import { User, userExperience } from "@/types";
import UserForm from "@/components/organisms/forms/userForm";
import ExperienceForm from "@/components/organisms/forms/experienceForm";
import Loader from "@/components/moleculles/loader";
import dynamic from "next/dynamic";
import ExpiredSessionCard from "@/components/organisms/expiredSessionCard";
import axios from "axios";




const ConfirmForm = dynamic(
  () => import("@/components/moleculles/confirmForm"),
  { ssr: false }
);
const UploadImageForm =  dynamic(
  () => import("@/components/organisms/forms/uploadImageForm"),
  { ssr: false }
);



const Page = () => {
  {
    /*state management*/
  }
  const [showUserForm, setShowUserForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null); // Selected job ID for confirmation form
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    name: "",
    bio: "",
    country: "",
    dateOfBirth: "",
    city:"",
    status: "",
  });
  const [experience, setExperience] = useState<userExperience>({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    experienceLevel: "",
  });

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const params = useParams();
  const userName = params?.name as string;
  

  const { id: loggedInUserId, isAuthenticated, logout } = useAuth();
  const [sessionExpired, setSessionExpired] = useState(false);
  const checkTokenExpiration = () => {
    if (typeof window !== "undefined") {
      const expiresAt = localStorage.getItem("expiresAt");
      if (expiresAt && Date.now() > Number(expiresAt)) {
        setSessionExpired(true);
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);


  {
    /* Fetch user data */
  }
  const { data: user, error, isLoading } = useGetUserByIdQuery(userName);
  const { data: applications, isLoading: applicationsLoading } =
    useGetApplicationByUserIdQuery(loggedInUserId);
  const { data: experiences, isLoading: experiencesLoading } =
    useGetExperiencesByUserQuery(loggedInUserId);
  const [updateUser] = useUpdateUserMutation();
  const [createExperiences] = useCreateExperiencesMutation();
  const [deleteExperiences] = useDeleteExperiencesMutation();



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        setShowUploadForm(true); // Show the upload form when a file is selected
      }
    };
    const handleUploadImage = async () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
    
          setUploading(true);
    
          try {
            const response = await axios.post(
              `https://findjob-4vl9.onrender.com/api/v1/user/${user.id}/upload`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              },
              
            );
            console.log(response.data);
            setSelectedFile(null);
            setShowUploadForm(false); 
            alert('Image uploaded successfully!');
          } catch (err) {
            console.error('Image upload failed', err);
          } finally {
            setUploading(false);
          }
        }
      };
      const handleCancelUpload = () => {
        setSelectedFile(null);
        setShowUploadForm(false); // Hide the upload form on cancel
      };
    

  const handleUpdate = async (userData: User) => {
    try {
      await updateUser({
        ...userData,
      });
      console.log("User", userData);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleAddExperience = async () => {
    try {
      const newExperience = {
        userId: loggedInUserId,
        title: experience.title,
        company: experience.company,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
        experienceLevel: experience.experienceLevel,
      };
  
      await createExperiences(newExperience);
  
      alert("Experience added successfully!");
      setShowExperienceForm(false);
    } catch (error) {
      console.error("Error adding experience:", error);
      alert("Failed to add experience. Please try again.");
    }
  };
  
  const handleDeleteExperience = async () => {
    if (!selectedJobId) return; 

    try {
      await deleteExperiences(selectedJobId); 
      setShowConfirmForm(false); 
      alert("Application submitted successfully!"); 
    } catch (error) {
      console.error("Failed to create application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };
  const handleShowConfirmForm = (jobId: number) => {
    setSelectedJobId(jobId); 
    setShowConfirmForm(true); 
  };

  useEffect(() => {
    if (loggedInUserId && user?.id) {
      setIsCurrentUser(loggedInUserId === user.id);
    }
  }, [loggedInUserId, user?.id]);

  if (isLoading || !isAuthenticated)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />.
      </div>
    );
  if (sessionExpired) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <ExpiredSessionCard logout={logout} />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-gray-600">
          The user you are looking for does not exist.
        </p>
      </div>
    );
  }

  if (error)
    return <div className="text-center py-20">Error loading user data</div>;

  return (
    <>
      {showConfirmForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowConfirmForm(false)}
        >
          <ConfirmForm
            handleConfirmApplication={handleDeleteExperience}
            onClose={() => setShowConfirmForm(false)}
            confirmActionMessage="Are you sure you want to delete this experience?"
            confirmAction="Delete Experience"
          />
        </div>
      )}
      {/** showUserForm */}
      {showUserForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowUserForm(false)}
        >
          <UserForm
            isLoading={isLoading}
            showForm={showUserForm}
            userData={currentUser}
            setUserData={setCurrentUser}
            onSubmit={handleUpdate}
            onClose={() => setShowUserForm(false)}
          />
        </div>
      )}

      {/* showUploadForm */}

      {showExperienceForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowExperienceForm(false)}
        >
          <ExperienceForm
            isLoading={isLoading}
            showForm={showExperienceForm}
            experienceData={experience}
            setExperienceData={setExperience}
            onSubmit={handleAddExperience}
            onClose={() => setShowExperienceForm(false)}
          />
        </div>
      )}
      {/* Header Section */}
      <Header />
      <main className="px-[10%] py-[5%] min-w-full min-h-screen bg-gray-50">
        {/* Profile Info Section */}
        <ProfileInfo
          key={user?.id}
          user={user}
          isCurrentUser={isCurrentUser}
          handleUpdateUser={(user: User) => {
            setShowUserForm(true);
            setCurrentUser(user);
          }}
          handleFileChange={handleFileChange}
        />
        {/* show upload form image */}
        {
          showUploadForm &&
          <UploadImageForm handleUploadImage={handleUploadImage} handleCancelUpload={handleCancelUpload} selectedFile={selectedFile} uploading={uploading} />
        }
        
        {/* Main Content - Grid Layout */}
        <div className="grid grid-cols-2  gap-8 mt-8 max-[1124px]:grid-cols-1">
          {/* Job Applications Section */}
          {isCurrentUser ? (
              <JobsApplications
              applications={applications}
              applicationsLoading={applicationsLoading}
            />
            )
            : (
             ""
            )
         
          }
          {/* Experiences Section */}
        {
          experiencesLoading ? (
            <Loader />
          ) : (
            <Experiences
            key={user?.id}
            experiences={experiences}
            experiencesLoading={experiencesLoading}
            user={user}
            isCurrentUser={isCurrentUser}
            handleShowConfirmForm={handleShowConfirmForm}
             
            handleCreateExperience={() => () => {
              setShowExperienceForm(true);
              setExperience(experience);
            }}
            />
          )
        }
        </div>
      </main>
    </>
  );
};

export default Page;
