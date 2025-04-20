const express = require('express');
const router = express.Router();
const { bookSession, getMenteeSessions, getMentorSessions } = require('../controllers/sessionController');

// Book a new session
router.post('/book', bookSession);

// Get upcoming sessions for a mentee
router.get('/mentee/:menteeName', getMenteeSessions);

// Get all sessions for a mentor
router.get('/mentor/:mentorName', getMentorSessions);

module.exports = router;