import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Trophy, Star } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary purpose of React's useEffect hook?",
    options: [
      "To handle state management",
      "To perform side effects in components",
      "To create custom hooks",
      "To optimize rendering"
    ],
    correctAnswer: 1,
    explanation: "useEffect is used for handling side effects like data fetching, subscriptions, or DOM mutations."
  },
  {
    id: 2,
    question: "Which data structure would be most efficient for implementing a cache?",
    options: [
      "Array",
      "Linked List",
      "Hash Map",
      "Binary Tree"
    ],
    correctAnswer: 2,
    explanation: "Hash Maps provide O(1) average time complexity for insertions and lookups, making them ideal for caches."
  },
  {
    id: 3,
    question: "What is the purpose of the 'virtual DOM' in React?",
    options: [
      "To directly manipulate the browser's DOM",
      "To store component state",
      "To optimize performance by minimizing actual DOM updates",
      "To handle routing in React applications"
    ],
    correctAnswer: 2,
    explanation: "The virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering performance."
  }
];

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answerIndex);
    if (answerIndex === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameComplete(false);
  };

  const getScoreBadgeColor = () => {
    const percentage = (score / sampleQuestions.length) * 100;
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="w-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Tech Quiz Challenge</CardTitle>
              <CardDescription>Master your technical skills through interactive learning</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-1 bg-primary/20 text-primary">
            {score}/{sampleQuestions.length}
          </Badge>
        </div>
      </CardHeader>

      <div className="space-y-6">
        {!gameComplete ? (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </h3>
              <p className="text-lg">{sampleQuestions[currentQuestion].question}</p>

              <div className="grid gap-3">
                {sampleQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === null ? "outline" : 
                      index === sampleQuestions[currentQuestion].correctAnswer ? "secondary" :
                      index === selectedAnswer ? "destructive" : "outline"}
                    className={`justify-start h-auto py-4 px-6 text-left text-lg relative overflow-hidden transition-all duration-300 ${selectedAnswer === null ? 'hover:scale-[1.02] hover:shadow-lg' : ''} ${selectedAnswer !== null && index === sampleQuestions[currentQuestion].correctAnswer ? 'animate-pulse-success' : ''}`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span className="ml-3">{option}</span>
                    {selectedAnswer !== null && index === sampleQuestions[currentQuestion].correctAnswer && (
                      <div className="absolute right-4 text-green-500 animate-bounce">
                        <Trophy className="h-5 w-5" />
                      </div>
                    )}
                  </Button>
                ))}
              </div>

              {showExplanation && (
                <div className="mt-6 p-6 bg-primary/5 border border-primary/10 rounded-xl animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <p className="font-semibold text-primary">Learning Point</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {sampleQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              {selectedAnswer !== null && (
                <Button
                  className="w-full mt-4"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion < sampleQuestions.length - 1 ? "Next Question" : "Complete Quiz"}
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-8 py-8 animate-fade-up">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-75 blur-lg rounded-full animate-pulse" />
              <Trophy className="h-20 w-20 mx-auto text-yellow-500 relative animate-bounce-slow" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Quiz Complete!
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                You scored {score} out of {sampleQuestions.length}
              </p>
              <div className="flex justify-center gap-2 animate-fade-in">
                {[...Array(score)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 fill-current text-yellow-500 animate-ping-slow" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
              </div>
              <Badge className={`${getScoreBadgeColor()} text-white px-6 py-3 text-lg font-semibold animate-scale-in`}>
                {Math.round((score / sampleQuestions.length) * 100)}% Mastery
              </Badge>
            </div>
            <Button 
              onClick={resetGame} 
              className="mt-8 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity px-8 py-6 text-lg"
            >
              Challenge Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuizGame;