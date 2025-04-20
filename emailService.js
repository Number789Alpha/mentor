const nodemailer = require('nodemailer');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Format date and time for email
const formatDateTime = (date, time) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return `${formattedDate} at ${time}`;
};

// Send session confirmation emails
const sendSessionConfirmationEmails = async (sessionData) => {
  const { mentorName, mentorEmail, menteeName, menteeEmail, topic, date, time, duration, meetLink } = sessionData;
  const formattedDateTime = formatDateTime(date, time);

  const emailTemplate = (recipientName) => ({
    subject: 'Mentorship Session Confirmation',
    html: `
      <h2>Mentorship Session Confirmed</h2>
      <p>Hello ${recipientName},</p>
      <p>Your mentorship session has been confirmed with the following details:</p>
      <ul>
        <li><strong>Topic:</strong> ${topic}</li>
        <li><strong>Date & Time:</strong> ${formattedDateTime}</li>
        <li><strong>Duration:</strong> ${duration} minutes</li>
        <li><strong>Mentor:</strong> ${mentorName}</li>
        <li><strong>Mentee:</strong> ${menteeName}</li>
      </ul>
      <p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
      <p>Please join the session using the Google Meet link above at the scheduled time.</p>
      <p>Best regards,<br>Echo Rise Mentorship Hub Team</p>
    `
  });

  try {
    // Send email to mentor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: mentorEmail,
      ...emailTemplate(mentorName)
    });

    // Send email to mentee
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: menteeEmail,
      ...emailTemplate(menteeName)
    });

    return true;
  } catch (error) {
    console.error('Error sending confirmation emails:', error);
    return false;
  }
};

module.exports = {
  sendSessionConfirmationEmails
};