"use client";

import React from "react";
import { Briefcase, MapPin, Star } from "lucide-react"; // Added Star icon import
import Image from "next/image";
import Loader from "../../moleculles/loader";
import { User, userExperience } from "@/types";

type UserProfileFormProps = {
    user: User;
    experiences: userExperience[];
    isUserLoading: boolean;
    isExperiencesLoading: boolean;
};

const UserProfileForm: React.FC<UserProfileFormProps> = ({
    user,
    experiences,
    isUserLoading,
    isExperiencesLoading,
}) => {
    // Combined loading state
    const isLoading = isUserLoading || isExperiencesLoading;

    return (
        <div
            className="w-[500px] h-[550px] bg-white rounded-xl shadow-lg overflow-y-auto flex flex-col transition-transform duration-500 hover:scale-100"
            onClick={(e) => e.stopPropagation()}
        >
            {isLoading ? (
                // Loading state
                <div className="flex items-center justify-center h-full w-full">
                    <Loader />
                </div>
            ) : (
                // Content when data is loaded
                <>
                    {/* Header Section with Gradient Background */}
                    <div className="relative min-w-full h-[250px] bg-gradient-to-br from-blue-600 to-purple-500 rounded-t-xl p-10">
                        <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg">
                            <Image
                                src={user?.image || "/images/unkown-person.jpg"}
                                alt="User Avatar"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                                className="rounded-full"
                            />
                        </div>
                    </div>

                    {/* Profile Info Section */}
                    <div className="mt-20 px-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">{user?.name}</h2>
                                <p className="text-md text-gray-700 mt-1 leading-relaxed">
                                    {user?.bio || "No bio available"}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin className="text-gray-600" size={16} />
                                    <p className="text-gray-700 font-medium">
                                        {user?.country || "Unknown location"},{user?.city}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="px-6 pb-6 mt-6">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Experiences</h3>
                        {experiences?.length > 0 ? (
                            <div className="space-y-4">
                                {experiences.map((exp) => (
                                    <div
                                        key={exp.id}
                                        className="p-6 border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-300 bg-white"
                                    >
                                        {/* Experience Title and Icon */}
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="text-blue-600" size={20} />
                                            <h2 className="text-lg font-semibold text-gray-800">{exp.title}</h2>
                                        </div>

                                        {/* Company and Duration */}
                                        <p className="text-sm text-gray-700 mt-2">
                                            <strong>Company:</strong> {exp.company}
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1">
                                            <strong>Duration:</strong> {exp.startDate} - {exp.endDate || "Present"}
                                        </p>

                                        {/* Location */}
                                        <p className="text-sm text-gray-700 mt-2">
                                            <strong>Location:</strong> {exp.location}
                                        </p>

                                        {/* Experience Level with Icon */}
                                        <div className="flex items-center gap-2 mt-2 -ml-2">
                                            <Star className="text-yellow-500" size={16} />{" "}
                                            {/* Use a star icon for experience level */}
                                            <p className="text-sm text-gray-700">
                                                <strong>Experience Level:</strong> {exp.experienceLevel}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-6 text-gray-500">No experiences found.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfileForm;