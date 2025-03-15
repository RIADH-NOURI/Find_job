// services/email.service.js
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (email, resetToken, userType) => {
  const resetLink = `https://find-job-topaz.vercel.app/reset-password?token=${resetToken}&type=${userType}`;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>This link expires in 1 hour.</p>`,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
