import  Avatar from "@mui/material/Avatar";
import { Ellipsis } from "lucide-react";
import React from "react";
import { userNotifications } from "@/types";
type NotificationCardProps = {
  userNotifications: userNotifications[];
  handleMenuToggle: (notificationId: string) => void;
  handleDeleteNotification: (notificationId: string) => void;
  menuOpen: number | null;
  getMessageStyle: (message: string) => string;
  deleteLoading: boolean;
};


const NotificationCard = ({
  userNotifications,
  handleMenuToggle,
  handleDeleteNotification,
  menuOpen,
  getMessageStyle,
  deleteLoading,
}: NotificationCardProps) => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>

        <div className="space-y-4">
          {userNotifications.length === 0 ? (
            <p className="text-center">No notifications found</p>
          ) : (
            userNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-sm notification-container ${
                  notification.isRead ? "bg-white" : getMessageStyle(notification.message)
                }`}
              >
                <div className="flex items-center space-x-4 relative">
                  <Avatar alt="User Avatar" src={notification.recruiter.image} />
                  <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700">
                      {notification.recruiter.company}
                    </p>                    <p className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleDateString()} 
{' '}
{new Date(notification.createdAt).toLocaleTimeString()} 
                    </p>
                    <p className={`text-sm text-gray-500 ${notification.message === "ACCEPTED" ? "text-green-500" : "text-red-500"}`}>
                      {notification.message}
                    </p>  
                    
                  </div>
                  {!notification.isRead && (
                    <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
                  )}

                  <button
                    onClick={() => handleMenuToggle(notification.id)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Ellipsis />
                  </button>

                  {menuOpen === notification.id && (
                    <div className="absolute right-0 mt-12 bg-white shadow-lg rounded-md p-2">
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                       {`${deleteLoading ? "Deleting..." : "Delete"}`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationCard;