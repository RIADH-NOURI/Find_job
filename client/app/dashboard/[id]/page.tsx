"use client";
import {
  useGetRecruiterByIdQuery,
  useGetApplicationsByRecruiterIdQuery,
  useUpdateStatusApplicationMutation,
  useDeleteRecruiterByIdMutation,
} from "@/redux/apis/private/recruiterApi";
import { useState } from "react";
import { useGetUserByIdQuery } from "@/redux/apis/private/userApi";
import { useGetExperiencesByUserIdQuery } from "@/redux/apis/private/experiencesUserApi";
import { useParams } from "next/navigation";
import Dashboard from "@/components/layout/dashboard";
import Loader from "@/components/moleculles/loader";
import dynamic from "next/dynamic";
import StatsCards from "@/components/dashboard/templates/recruiter/statsCards";
import ApplicationList from "@/components/dashboard/templates/recruiter/applicationList";
import { useAuth } from "@/hooks/useAuth";
import Pagination from "@mui/material/Pagination";

const UserProfileForm = dynamic(
  () => import("@/components/dashboard/forms/userProfileForm"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);
const ConfirmForm = dynamic(
  () => import("@/components/moleculles/confirmForm"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

const DashboardPage = () => {
  // State Management
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [selectedStatusApp, setSelectedStatusApp] = useState("");
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const [selecteId, setSelectedId] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Auth and Params
  const { logout } = useAuth();
  const recruiterId = useParams().id as string;

  // Data Fetching
  const { data: recruitersApplications, isLoading } =
    useGetRecruiterByIdQuery(recruiterId);
  const { data: applications, isLoading: isAppsLoading, refetch } =
    useGetApplicationsByRecruiterIdQuery({
      id: recruiterId,
      page: currentPage,
      limit: limit,
    });

  const { isLoading: isUserLoading, data: user } =
    useGetUserByIdQuery(selecteId);
  const { isLoading: isExperiencesLoading, data: experiences } =
    useGetExperiencesByUserIdQuery(selecteId);
  const [updateStatusApplication, { isLoading: isUpdateLoading }] =
    useUpdateStatusApplicationMutation();
  const [deleteRecruiter, { isLoading: isDeleteLoading }] =
    useDeleteRecruiterByIdMutation();

  // Calculate Application Stats
  const acceptedApplicationsCount =
    applications?.applications.filter((app) => app?.status === "ACCEPTED")
      .length || 0;
  const pendingApplicationsCount =
    applications?.applications.filter((app) => app?.status === "PENDING")
      .length || 0;
  const rejectedApplicationsCount =
    applications?.applications.filter((app) => app?.status === "REJECTED")
      .length || 0;

  const stats = [
    {
      title: "Accepted",
      count: acceptedApplicationsCount,
      color: "bg-green-500",
      icon: "✅",
    },
    {
      title: "Pending",
      count: pendingApplicationsCount,
      color: "bg-yellow-500",
      icon: "⏳",
    },
    {
      title: "Rejected",
      count: rejectedApplicationsCount,
      color: "bg-red-500",
      icon: "❌",
    },
  ];

  // Event Handlers

  const reloadApplications = () => {
    refetch(); 
  };  const handleUpdateStatus = async () => {
    if (!selecteId || !selectedStatusApp) return;

    try {
      await updateStatusApplication({
        applicationId: selecteId,
        status: selectedStatusApp === "accept" ? "ACCEPTED" : "REJECTED",
      });
      alert("Application status updated successfully!");
      setSelectedStatusApp("");
      setShowConfirmForm(false);
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleDeleteRecruiter = async () => {
    try {
      await deleteRecruiter(recruiterId);
    } catch (error) {
      console.error("Error deleting recruiter:", error);
    }
  };

  const handleConfirmAction = () => {
    if (selectedAction === "logout") {
      logout();
    } else if (selectedAction === "update") {
      handleUpdateStatus();
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // Conditional Rendering
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!recruitersApplications) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-gray-600">
          The user you are looking for does not exist.
        </p>
      </div>
    );
  }

  // Main Render
  return (
    <>
      <Dashboard userData={recruitersApplications}>
        {/* User Profile Form */}
        {showUserInfo && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowUserInfo(false)}
          >
            <UserProfileForm
              experiences={experiences}
              user={user}
              isUserLoading={isUserLoading}
              isExperiencesLoading={isExperiencesLoading}
            />
          </div>
        )}

        {/* Confirmation Form */}
        {showConfirmForm && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowConfirmForm(false)}
          >
            <ConfirmForm
              onClose={() => setShowConfirmForm(false)}
              handleConfirmApplication={handleConfirmAction}
              confirmActionMessage="Are you sure you want to update this application?"
              confirmAction={`${
                isUpdateLoading || isDeleteLoading ? "Updating..." : "Update"
              }`}
            />
          </div>
        )}

        {/* Stats Cards */}
        <StatsCards
          stats={stats}
          isLoading={isLoading}
          isAppsLoading={isAppsLoading}
        />

        {/* Applications List */}
        {isAppsLoading ? (
          <div className="w-full max-h-full flex items-center justify-center">
            <Loader />
          </div>
        ) : applications?.applications?.length > 0 ? (
          <ApplicationList
            applications={applications}
            isAppsLoading={isAppsLoading}
            setSelectedId={setSelectedId}
            setShowUserInfo={setShowUserInfo}
            setSelectedStatus={setSelectedStatusApp}
            setShowConfirmForm={setShowConfirmForm}
            setSelectedAction={setSelectedAction}
            reloadApplications={reloadApplications}
          />
        ) : (
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold">No Applications Found</h1>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <Pagination
            count={applications?.pagination?.totalPages || 1}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </div>
      </Dashboard>
    </>
  );
};

export default DashboardPage;
