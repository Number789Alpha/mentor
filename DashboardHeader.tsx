
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserContext";

interface DashboardHeaderProps {
  userType: "mentor" | "mentee";
  collapsed: boolean;
}

const DashboardHeader = ({ userType, collapsed }: DashboardHeaderProps) => {
  const { user, logout } = useUser();
  const userName = user?.name || (userType === "mentor" ? "Rajat Kumar" : "Harsh Shukla");
  const userRole = userType === "mentor" ? "Mentor" : "Mentee";
  
  // Create initials from user name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("");
  };

  return (
    <header
      className={`fixed top-0 right-0 h-16 ${
        collapsed ? "left-20" : "left-64"
      } transition-all duration-300 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-30 flex items-center px-6`}
    >
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
        <h2 className="text-xl font-semibold ml-4 md:hidden">
          {userType === "mentor" ? "Mentor" : "Mentee"} Dashboard
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="py-3 px-4">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">New session booked</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userType === "mentor" ? user?.name || "Priya Sharma" : user?.name || "Rajat Kumar"} has booked a session for tomorrow at 5:00 PM.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    5 minutes ago
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 px-4">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">Session reminder</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You have a session scheduled in 1 hour.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 hour ago
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 px-4">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">New resource added</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Check out the new resource on career development.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 days ago
                  </p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-echopurple-600 dark:text-echopurple-400 font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || (userName === "Harsh Shukla" ? "/mentors/harsh-shukla.svg" : userName === "Karan" ? "/mentors/karan.svg" : "/placeholder.svg")} alt={userName} />
                <AvatarFallback>
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {userRole}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {
              if (userType === "mentor") {
                window.location.href = "/mentor/profile";
              } else {
                window.location.href = "/mentee/profile";
              }
            }}>My Profile</DropdownMenuItem>
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={logout}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
