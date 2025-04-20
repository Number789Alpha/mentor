import express from 'express';
import { assessmentController } from '../controllers/questionBank';

const router = express.Router();

// Start a new assessment
router.post('/start', assessmentController.startNewAssessment);

// Submit assessment answers
router.post('/:id/submit', assessmentController.submitAssessment);

// Get user's assessments
router.get('/user/:userId', assessmentController.getUserAssessments);

// Get assessment details
router.get('/:id', assessmentController.getAssessmentDetails);

export default router;