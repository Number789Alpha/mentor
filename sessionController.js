const Session = require('../models/Session');
const { sendSessionConfirmationEmails } = require('../utils/emailService');

// Book a new session
exports.bookSession = async (req, res) => {
  try {
    const { mentorName, menteeName, mentorEmail, menteeEmail, topic, date, time, duration } = req.body;

    // Validate required fields
    if (!mentorName || !menteeName || !mentorEmail || !menteeEmail || !topic || !date || !time || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate date and time
    const sessionDate = new Date(date);
    if (sessionDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book sessions in the past'
      });
    }

    const sessionData = {
      ...req.body,
      meetLink: process.env.GOOGLE_MEET_LINK,
      status: 'confirmed'
    };

    // Create new session in database
    const session = await Session.create(sessionData);

    // Send confirmation emails
    try {
      await sendSessionConfirmationEmails(session);
    } catch (emailError) {
      console.error('Failed to send confirmation emails:', emailError);
    }

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Error booking session:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get upcoming sessions for a mentee
exports.getMenteeSessions = async (req, res) => {
  try {
    const { menteeName } = req.params;
    
    if (!menteeName) {
      return res.status(400).json({
        success: false,
        message: 'Mentee name is required'
      });
    }

    const sessions = await Session.find({
      menteeName,
      date: { $gte: new Date() },
      status: { $in: ['pending', 'confirmed'] }
    }).sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (error) {
    console.error('Error fetching mentee sessions:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all sessions for a mentor
exports.getMentorSessions = async (req, res) => {
  try {
    const { mentorName } = req.params;
    
    const sessions = await Session.find({
      mentorName,
      date: { $gte: new Date() },
      status: { $ne: 'cancelled' }
    }).sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    console.error('Error fetching mentor sessions:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};