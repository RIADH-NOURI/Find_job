import path from "path";
import fs from "fs";
import {
  findAllUsers,
  findUserByName,
  updateUserById,
  deleteUserById,
  getUserApplications,
  updateImageByUserId,
  
} from "../../models/private/user.model.js";
import {uploadImageToCloudinary}from "../../services/cloudinary.service.js";
import {  convertImageToWebP } from "../../utils/imageProcessor.js";



// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get user by ID
export const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await findUserByName(name);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Invalid user" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {name,bio,country,dateOfBirth,city,status} = req.body
    const updatedUser = await updateUserById(id, {name,bio,country,dateOfBirth,city,status});
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    res.status(200).json({ error: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get applications by user ID
export const getApplicationByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const applications = await getUserApplications(id);
    if (!applications) return res.status(404).json({ error: "User not found" });

    res.status(200).json(applications.applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};


// Upload User Profile Image
export const uploadProfileImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if image is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const uploadedImagePath = req.file.path;
    const outputFilePath = path.join(path.dirname(uploadedImagePath), `${Date.now()}.webp`);

  
      await convertImageToWebP(uploadedImagePath, outputFilePath);

    const imageUrl = await uploadImageToCloudinary(outputFilePath);

    fs.unlinkSync(outputFilePath);

    const userImage = await updateImageByUserId(id, imageUrl);

    res.status(200).json(userImage);
  } catch (error) {
    console.error("Error uploading profile image:", error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


