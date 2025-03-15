// controllers/auth.controller.js
import {
    findUserByEmail,
    saveResetToken,
    generateResetToken,
    findUserByResetToken,
    updatePassword,
  } from '../../models/public/auth.model.js';
  import { sendResetEmail } from '../../services/email.service.js';
  
  // Request password reset
  export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
  
    try {
      const { user, userType } = await findUserByEmail(email);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const resetToken = generateResetToken();
      await saveResetToken(email, resetToken, userType);
  
      const emailSent = await sendResetEmail(email, resetToken, userType);
      if (!emailSent) return res.status(500).json({ error: 'Failed to send email' });
  
      res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Reset password
  export const resetPassword = async (req, res) => {
    const { token, newPassword, type } = req.body;
    
    if (!token || !newPassword || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const user = await findUserByResetToken(token, type);
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }
  
      const updatedUser = await updatePassword(type, user.id, newPassword);
      if (!updatedUser) {
        return res.status(500).json({ error: 'Failed to update password' });
      }
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error during password reset:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  