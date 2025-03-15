import Loader from "@/components/moleculles/loader";
import Avatar from "@mui/material/Avatar";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

interface applicationsListProps {
  applications: any[];
  isLoading: boolean;
  isAppsLoading: boolean;
   setSelectedId: (id: number) => void;
  setShowUserInfo: (show: boolean) => void;
  setSelectedStatus: (status: string) => void;
  setShowConfirmForm: (show: boolean) => void;
  setSelectedAction: (action: string) => void;
}
const ApplicationList = ({
  applications = [],
  isLoading,
  isAppsLoading,
  setSelectedId,
  setShowUserInfo,
  setSelectedStatus,
  setShowConfirmForm,
  setSelectedAction,
}) => {

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 sm:mb-6">Applications</h2>

      {isLoading || isAppsLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {applications?.applications.map((app) => (
            <div
              key={app.id}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow space-y-4 lg:space-y-0"
            >
              {/* User Info */}
              <div className="flex-1 w-full lg:w-auto">
                <div className="flex gap-3 items-center">
 <div className='w-10 h-10'>
            <Image
              layout='fill'
              objectFit="cover"
              objectPosition="center"
              className="rounded-full"
              src={`${app.user?.image || '/images/unkown-person.jpg'}`}
              alt="Logo"
            />
          </div>                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold">{app.user.name}</h3>
                    <p className="text-gray-600 text-sm lg:text-base">{app.user.email}</p>
                  </div>
                </div>
              </div>

              {/* Job Title */}
              <div className="flex-1 w-full lg:w-auto mt-4 lg:mt-0">
                <p className="text-gray-600 text-sm lg:text-base">
                  Applied for:{" "}
                  <span className="font-semibold">{app.job.title}</span>
                </p>
              </div>

              {/* Status */}
              <div className="flex-1 w-full lg:w-auto mt-4 lg:mt-0">
                <p
                  className={`text-sm lg:text-base font-semibold ${
                    app.status === "ACCEPTED"
                      ? "text-green-600"
                      : app.status === "REJECTED"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {app.status}
                </p>
              </div>

              {/* View Profile Button */}
              <button
                className="w-full lg:w-auto mt-4 mr-5 lg:mt-0 p-2 text-primary-color border-2 border-primary-color hover:bg-primary-color hover:text-white rounded-lg transition-colors"
                onClick={() => {
                  setSelectedId(app.user.name);
                  setShowUserInfo(true);
                }}
              >
                View Profile
              </button>

              {/* Action Buttons */}
              <div className="flex space-x-4 w-full lg:w-auto mt-4 lg:mt-0">
                <button
                  className="flex items-center justify-center p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors w-full lg:w-auto"
                  onClick={() => {
                    setSelectedId(app.id);
                    setShowConfirmForm(true);
                    setSelectedStatus("accept");
                    setSelectedAction("update");
                  }}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button
                  className="flex items-center justify-center p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors w-full lg:w-auto"
                  onClick={() => {
                    setSelectedId(app.id);
                    setShowConfirmForm(true);
                    setSelectedStatus("reject");
                    setSelectedAction("update");
                  }}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;