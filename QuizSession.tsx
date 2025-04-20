import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Timer, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { quizService } from "@/services/quizService";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizSessionProps {
  quizId: string;
  onComplete: (result: {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeTaken: number;
  }) => void;
  onExit: () => void;
}

const QuizSession = ({ quizId, onComplete, onExit }: QuizSessionProps) => {
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadQuiz = async () => {
      const quizData = await quizService.getQuizById(quizId);
      if (quizData) {
        setQuiz(quizData);
        setTimeLeft(quizData.timeLimit * 60); // Convert minutes to seconds
      }
    };
    loadQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && quiz) {
      handleQuizComplete();
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answer: string) => {
    if (isSubmitting) return;
    setSelectedAnswer(answer);
    setAnswers({ ...answers, [currentQuestionIndex]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1] || null);
      setShowExplanation(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = async () => {
    setIsSubmitting(true);
    const correctAnswers = quiz.questions.reduce(
      (count: number, question: Question, index: number) =>
        answers[index] === question.correctAnswer ? count + 1 : count,
      0
    );

    const score = Math.round((correctAnswers / quiz.questions.length) * quiz.points);
    const timeTaken = quiz.timeLimit * 60 - timeLeft;

    onComplete({
      score,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      timeTaken,
    });
  };

  if (!quiz) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <p>Loading quiz...</p>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{quiz.title}</CardTitle>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="secondary">{quiz.points} points</Badge>
          </div>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <p className="text-lg font-medium">{currentQuestion.text}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option: string, index: number) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => handleAnswerSelect(option)}
                disabled={isSubmitting}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardContent className="p-4">
              <p className="font-medium mb-2">
                {selectedAnswer === currentQuestion.correctAnswer
                  ? "✅ Correct!"
                  : "❌ Incorrect"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {currentQuestion.explanation}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onExit}>
            Exit Quiz
          </Button>
          <Button
            onClick={() => {
              if (!showExplanation && selectedAnswer) {
                setShowExplanation(true);
              } else {
                handleNext();
              }
            }}
            disabled={!selectedAnswer || isSubmitting}
          >
            {!showExplanation
              ? "Check Answer"
              : currentQuestionIndex < quiz.questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizSession;