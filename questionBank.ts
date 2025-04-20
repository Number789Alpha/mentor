import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Assessment from '../models/Assessment';

// Define assessment question bank by category
const questionBank = {
    frontend: [
        {
            id: '1',
            question: 'What is React Virtual DOM?',
            options: [
                'A copy of the actual DOM',
                'A virtual machine',
                'A browser extension',
                'A JavaScript library'
            ],
            correctAnswer: 'A copy of the actual DOM',
            difficulty: 'intermediate'
        },
        // Add more frontend questions
    ],
    backend: [
        {
            id: '2',
            question: 'What is Node.js event loop?',
            options: [
                'A single-threaded event mechanism',
                'A multi-threaded system',
                'A database system',
                'A web server'
            ],
            correctAnswer: 'A single-threaded event mechanism',
            difficulty: 'intermediate'
        },
        // Add more backend questions
    ],
    // Add more categories
};
// Question bank interface
interface QuestionBank {
    [key: string]: Array<{
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        difficulty: string;
    }>;
}

export const assessmentController = {
    // Start a new assessment
    async startNewAssessment(req: Request, res: Response) {
        try {
            const { userId, skillName } = req.body;

            if (!userId || !skillName) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Get questions for the category
            const category = skillName.toLowerCase();
            const questions = questionBank[category] || [];

            if (questions.length === 0) {
                return res.status(404).json({ error: 'No questions available for this category' });
            }

            // Create new assessment
            const newAssessment = new Assessment({
                userId,
                skillName,
                category,
                level: 0,
                completedAt: new Date(),
                questions: questions.slice(0, 5) // Limit to 5 questions per assessment
            });

            await newAssessment.save();

            res.status(201).json(newAssessment);
        } catch (error) {
            console.error('Start assessment error:', error);
            res.status(500).json({ error: 'Failed to start assessment' });
        }
    },

    // Submit assessment answers
    async submitAssessment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { answers } = req.body;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid assessment ID' });
            }

            const assessment = await Assessment.findById(id);

            if (!assessment) {
                return res.status(404).json({ error: 'Assessment not found' });
            }

            // Calculate score
            const correctAnswers = answers.filter(answer => {
                const question = assessment.questions.find(q => q.id === answer.questionId);
                return question && question.correctAnswer === answer.selectedAnswer;
            });

            const score = (correctAnswers.length / assessment.questions.length) * 100;

            // Update assessment
            assessment.answers = answers;
            assessment.level = score;
            assessment.completedAt = new Date();
            await assessment.save();

            res.json(assessment);
        } catch (error) {
            console.error('Submit assessment error:', error);
            res.status(500).json({ error: 'Failed to submit assessment' });
        }
    },

    // Get user's assessments
    async getUserAssessments(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const userAssessments = await Assessment.find({ userId });
            res.json(userAssessments);
        } catch (error) {
            console.error('Get user assessments error:', error);
            res.status(500).json({ error: 'Failed to fetch user assessments' });
        }
    },

    // Get assessment details
    async getAssessmentDetails(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid assessment ID' });
            }

            const assessment = await Assessment.findById(id);

            if (!assessment) {
                return res.status(404).json({ error: 'Assessment not found' });
            }

            res.json(assessment);
        } catch (error) {
            console.error('Get assessment details error:', error);
            res.status(500).json({ error: 'Failed to fetch assessment details' });

        }
    },
};
