import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Clock, ArrowRight, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizResultsProps {
  score: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  onRetry: () => void;
  onBackToQuizzes: () => void;
}

const QuizResults = ({
  score,
  totalPoints,
  correctAnswers,
  totalQuestions,
  timeTaken,
  onRetry,
  onBackToQuizzes,
}: QuizResultsProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const percentage = (correctAnswers / totalQuestions) * 100;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding performance! You're a master!";
    if (percentage >= 75) return "Great job! You've got solid knowledge!";
    if (percentage >= 60) return "Good effort! Keep practicing to improve!";
    return "Keep learning! Practice makes perfect!";
  };

  const handleShare = async () => {
    setIsSharing(true);
    const shareText = `I just scored ${score} points (${percentage.toFixed(1)}%) on the quiz! 🎯 #EchoMentor #Learning`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Quiz Results',
          text: shareText,
          url: window.location.href,
        });
        toast({
          title: "Shared successfully",
          description: "Your results have been shared!",
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied to clipboard",
          description: "Share text has been copied to your clipboard!",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <Trophy className="h-8 w-8 text-yellow-600" />
        </div>
        <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
        <CardDescription>{getPerformanceMessage()}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-500 mb-2">
            {score} / {totalPoints}
          </div>
          <p className="text-sm text-gray-500">points earned</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Accuracy</span>
            <span>{percentage.toFixed(1)}%</span>
          </div>
          <Progress value={percentage} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-xl font-bold">
                {correctAnswers}/{totalQuestions}
              </span>
            </div>
            <p className="text-sm text-gray-500">Correct Answers</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-xl font-bold">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
            <p className="text-sm text-gray-500">Time Taken</p>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium mb-3">Achievements Unlocked</h3>
          <div className="flex gap-2">
            {percentage >= 80 && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                High Scorer
              </Badge>
            )}
            {timeTaken < (totalQuestions * 30) && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Speed Demon
              </Badge>
            )}
            {percentage === 100 && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Perfect Score
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={handleShare} disabled={isSharing}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onRetry}>
              Try Again
            </Button>
            <Button className="flex-1" onClick={onBackToQuizzes}>
              More Quizzes <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResults;