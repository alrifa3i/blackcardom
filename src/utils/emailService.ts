
// This file is deprecated - email functionality has been moved to secure edge functions
// Use SecureEmailService component instead

export const sendEmail = async (to: string, subject: string, content: string) => {
  console.warn('This function is deprecated. Use the secure email service instead.');
  throw new Error('Email functionality has been moved to secure edge functions for security reasons.');
};
