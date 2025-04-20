import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8"
};

export function LoadingState({ message = "Loading...", className = "", size = "md" }: LoadingStateProps) {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}

export function LoadingSpinner({ size = "md", className = "" }: Omit<LoadingStateProps, "message">) {
  return <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />;
}