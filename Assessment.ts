import mongoose, { Schema, Document } from 'mongoose';

export interface IAssessment extends Document {
  userId: string;
  skillName: string;
  category: string;
  level: number;
  completedAt: Date;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    difficulty: string;
  }>;
  answers?: Array<{
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }>;
}

const AssessmentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  skillName: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, default: 0 },
  completedAt: { type: Date, default: Date.now },
  questions: [{
    id: String,
    question: String,
    options: [String],
    correctAnswer: String,
    difficulty: String
  }],
  answers: [{
    questionId: String,
    selectedAnswer: String,
    isCorrect: Boolean
  }]
});

export default mongoose.model<IAssessment>('Assessment', AssessmentSchema);