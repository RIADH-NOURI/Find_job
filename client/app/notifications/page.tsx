"use client";
import React, { useState } from "react";
import { useGetNotificationsByUserIdQuery, useDeleteNotificationMutation } from "@/redux/apis/private/notificationsApi";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/moleculles/loader";
import Header from "@/components/organisms/header";
import NotificationCard from "@/components/templates/notifications/notificationCard";

const getMessageStyle = (message) => {
  if (message.includes("ACCEPTED")) return "bg-green-500 text-white";
  if (message.includes("REJECTED")) return "bg-red-500 text-white";
  return "bg-blue-500 text-white";
};

const NotificationsCard = () => {
  // State Management
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  // Auth and Data Fetching
  const { id } = useAuth();
  const {
    data: userNotifications,
    isLoading,
    error,
  } = useGetNotificationsByUserIdQuery(id);
  const [deleteNotification] = useDeleteNotificationMutation();

  // Event Handlers
  const handleMenuToggle = (id: number) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id);
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  // Conditional Rendering
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error loading notifications</div>;
  }

  return (
    <>
      <Header />
       <NotificationCard userNotifications={userNotifications} handleMenuToggle={handleMenuToggle} handleDeleteNotification={handleDeleteNotification} getMessageStyle={getMessageStyle} menuOpen={menuOpen} />
    </>
  );
};

export default NotificationsCard;