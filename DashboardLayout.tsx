
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { useUser } from "@/contexts/UserContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: "mentor" | "mentee";
}

const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  // Redirect if user role doesn't match the dashboard type
  if (user && user.role !== userType) {
    navigate(`/${user.role}/dashboard`);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardSidebar userType={userType} />
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <DashboardHeader userType={userType} collapsed={sidebarCollapsed} />
        <main className="pt-24 px-6 pb-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
