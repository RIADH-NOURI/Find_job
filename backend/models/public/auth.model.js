// services/auth.service.js
import prisma from '../../config/prisma';
import crypto from 'crypto';

// Generate secure reset token
export const generateResetToken = () => crypto.randomBytes(32).toString('hex');

// Find user across User and Recruiter tables
export const findUserByEmail = async (email) => {
  let user = await prisma.user.findUnique({ where: { email } });
  let userType = 'user';

  if (!user) {
    user = await prisma.recruiter.findUnique({ where: { email } });
    userType = 'recruiter';
  }

  return { user, userType };
};

// Save reset token and expiry
export const saveResetToken = async (email, resetToken, userType) => {
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

  return prisma[userType].update({
    where: { email },
    data: { resetToken, resetTokenExpiry },
  });
};

// Find user by reset token
export const findUserByResetToken = async (token, userType) => {
  return prisma[userType].findFirst({
    where: { resetToken: token, resetTokenExpiry: { gte: new Date() } },
  });
};

// Update password and clear reset token
export const updatePassword = async (userType, id, newPassword) => {
    const hashedPassword = await Bun.password.hash(newPassword);

  return prisma[userType].update({
    where: { id },
    data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
  });
};
