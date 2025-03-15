"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "@/components/layout/dashboard";
import {
  useGetJobsByRecruiterIdQuery,
  useCreateJobForRecruiterMutation,
  useGetRecruiterByIdQuery,
  useDeleteJobByIdMutation
} from "@/redux/apis/private/recruiterApi";
import JobCard from "@/components/dashboard/templates/jobs/jobCardst";
import { useParams } from "next/navigation";
import {  Jobs} from "@/types";
import dynamic from "next/dynamic";
import axios from "axios";
import AddJobButton from "@/components/atoms/addJobButton";

const JobForm = dynamic(() => import("@/components/dashboard/forms/jobForm"),
  { ssr: false });

  const ConfirmForm = dynamic(() => import("@/components/moleculles/confirmForm"),
  { ssr: false });



const Page = () => {
   // Router and Params
   const recruiterId = useParams().id;
  // State Management
  const [jobData, setJobData] = useState<Jobs[],any>({
    recruiterId: recruiterId ,
    title: "",
    jobType: "",
    location: "",
    salary: Number(""),
    description: "",
    experienceLevel: "",
    technologies: [],
  });
  const [showJobForm, setShowJobForm] = useState(false);
  const [showconfirmForm, setShowConfirmForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [jobs, setJobs] = useState<string[]>([]);

 

  // Data Fetching
const { data, isLoading, isError } = useGetJobsByRecruiterIdQuery(recruiterId);
  const { data: recruiterData } = useGetRecruiterByIdQuery(recruiterId);
  const [createJob] = useCreateJobForRecruiterMutation();
  const [deleteJob] = useDeleteJobByIdMutation();

  // Fetch countries and jobs on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axios.get("/countries.json");
        setCountries(countriesResponse.data);

        const jobsResponse = await axios.get("/jobs.json");
        setJobs(jobsResponse.data.jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Log jobs data for debugging
  useEffect(() => {
    console.log("Jobs in JobCard:", data?.jobs);
  }, [data]);

  // Event Handlers
  const handleAddJob = async (jobDataSelected: Jobs) => {
    try {
      await createJob({
        recruiterId: recruiterId,
        ...jobDataSelected,
        salary: Number(jobDataSelected.salary),
      });
      alert("Job added successfully!");
      setShowJobForm(false);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleDeleteJob = async () => {
    if (!selectedJobId) return; // Ensure a job ID is selected

    try {
      await deleteJob(selectedJobId); // Delete the selected job
      setShowConfirmForm(false); // Close the confirmation form
      console.log(selectedJobId);
      alert("Application submitted successfully!"); // Notify the user
    } catch (error) {
      console.error("Failed to create application:", error);
      console.log(selectedJobId);
      alert("Failed to submit application. Please try again.");
    }
  };

  const handleShowConfirmForm = (jobId: number) => {
    setSelectedJobId(jobId); // Set the selected job ID
    setShowConfirmForm(true); // Show the confirmation form
  };

  // Conditional Rendering
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error loading jobs. Please try again later.</p>
      </div>
    );
  }

  // Main Render
  return (
    <Dashboard userData={recruiterData}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Job Listings</h1>
        <AddJobButton setShowJobForm={setShowJobForm} />
      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowJobForm(false)}
        >
          <JobForm
            isLoading={isLoading}
            showForm={showJobForm}
            jobData={jobData}
            setJobsData={setJobData}
            countries={countries}
            jobsSelectData={jobs}
            onSubmit={handleAddJob}
            onClose={() => setShowJobForm(false)}
          />
        </div>
      )}
      {/*show confirm form*/}
      {showconfirmForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowConfirmForm(false)}
        >
          <ConfirmForm
            handleConfirmApplication={handleDeleteJob}
            onClose={() => setShowConfirmForm(false)}
            confirmActionMessage="Are you sure you want to delete this job?"
            confirmAction="Delete job"
          />
        </div>
      )}


      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {
          data?.jobs.length > 0 ? (
            data?.jobs.map((job) => (
              <JobCard key={job.id} job={job} handleShowConfirmForm={handleShowConfirmForm} />
            ))
          ) : (
            <div className="min-w-full h-full flex items-center justify-center text-2xl text-gray-600 font-bold">No jobs found.</div> // Display a message if no jobs are found</div>
          )
        }
      </div>
    </Dashboard>
  );
};

export default Page;