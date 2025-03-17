"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGetJobsQuery } from "@/redux/apis/private/jobsApi";
import { useGetUserByIdQuery } from "@/redux/apis/private/userApi";
import { useGetCompanyBySearchQuery } from "@/redux/apis/private/recruiterApi";
import { Job } from "@/types";
import Pagination from "@mui/material/Pagination";
import Header from "@/components/organisms/header";
import { useAuth } from "@/hooks/useAuth";
import SearchBar from "@/components/organisms/searchBar";
import JobsCard from "@/components/templates/jobs/jobsCard";
import UserInfo from "@/components/templates/jobs/userInfo";
import FilterCard from "@/components/templates/jobs/filterCard";
import Loader from "@/components/moleculles/loader";
import axios from "axios";
import { useCreateApplicationMutation, useGetApplicationsCountByUserIdQuery } from "@/redux/apis/private/applicationApi";
import dynamic from "next/dynamic";
import { ScrollToTop } from "@/utils/scrolltotop";
import NotFoundJob from "@/components/organisms/notFoundJob";
import AdvencedButton from "@/components/atoms/advencedButton";
import { useGetExperiencesCountByUserIdQuery } from "@/redux/apis/private/experiencesUserApi";

const countries = await axios.get("/countries.json").then((data) => data.data);
const ConfirmForm = dynamic(() => import("@/components/moleculles/confirmForm"));

const Jobs = () => {
  // State Management
  const { id, role ,user} = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [localFilters, setLocalFilters] = useState({
    company: "",
    companyType: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({ ...localFilters });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [showfilterForm, setShowfilterForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  console.log(showfilterForm);
  

  // Data Fetching
  const {
    data: companyData,
    error: companyError,
    isLoading: companyLoading,
  } = useGetCompanyBySearchQuery(searchTerm);

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUserByIdQuery(id);

  const [createApplication, { isLoading: isApplicationLoading }] = useCreateApplicationMutation();
  const { data, isLoading, error } = useGetJobsQuery({
    page: currentPage,
    limit: 5,
    ...appliedFilters,
    company: searchCompany,
  });

  const { data: applicationData = [] } = useGetApplicationsCountByUserIdQuery(id);
  const { data: experienceData = [] } = useGetExperiencesCountByUserIdQuery(id);

  // Event Handlers
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleSubmitFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedFilters(localFilters);
    setCurrentPage(1);
    setSearchCompany("");
    setShowfilterForm(false);
  };

  const handleCreateApplication = async () => {
    if (!selectedJobId) return;

    try {
      await createApplication({
        userId: id,
        jobId: selectedJobId,
      });
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

  const handleSelectCompany = (companyName: string) => {
    setSearchTerm(companyName);
    setSearchCompany(companyName);
    setShowDropdown(false);
    setCurrentPage(1);
  };

  const handleSearchClick = () => {
    setSearchCompany(searchTerm);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show dropdown when typing in the search input
  useEffect(() => {
    if (searchTerm) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm]);

  // Conditional Rendering
  if (showfilterForm) {
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={() => setShowfilterForm(false)}
      >
        <FilterCard
          countries={countries}
          handleFilterChange={handleFilterChange}
          handleSubmitFilters={handleSubmitFilters}
          localFilters={localFilters}
          showFilterForm={showfilterForm}
        />
      </div>
    );
  }

  if (role === "RECRUITER") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold text-center">
          You are not authorized to view this page
        </h1>
      </div>
    );
  }

  

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  // Main Render
  return (
    <>
      {showConfirmForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowConfirmForm(false)}
        >
          <ConfirmForm
            onClose={() => setShowConfirmForm(false)}
            handleConfirmApplication={handleCreateApplication}
            confirmActionMessage="Are you sure you want to apply for this job?"
            confirmAction={`${isApplicationLoading ? "Loading..." : "Apply"}`}
          />
        </div>
      )}
      <Header />
      <main className="min-h-screen py-[5%] bg-gray-50">
        <SearchBar
          searchRef={searchRef}
          companyLoading={companyLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showDropdown={showDropdown}
          handleSelectCompany={handleSelectCompany}
          companyData={companyData}
          handleSearchClick={handleSearchClick}
        />
        <AdvencedButton setShowfilterForm={setShowfilterForm} />
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-[5%]">
          <UserInfo
            userData={userData}
            jobAppCount={applicationData.count}
            experiencesCount={experienceData.count}
          />
         {isLoading ? (
           <div className="md:col-span-2 w-full flex justify-center items-center">  <Loader />
</div>
         
) : data.jobs === null || data.jobs.length === 0 ? (
  <NotFoundJob />
) : (
  <JobsCard
          Jobsdata={data}
          handleShowConfirmForm={handleShowConfirmForm}
         
        />
 
)}

          <div className="h-full overflow-visible">
            <FilterCard
              countries={countries}
              handleFilterChange={handleFilterChange}
              handleSubmitFilters={handleSubmitFilters}
              localFilters={localFilters}
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <Pagination
            count={data?.pagination?.totalPages || 1}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </div>
      </main>
    </>
  );
};

export default Jobs;