
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Settings,
  User,
  Clock,
  BarChart,
  LogOut,
  Target,
  BookOpen,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";

interface SidebarProps {
  userType: "mentor" | "mentee";
}

const DashboardSidebar = ({ userType }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useUser();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const mentorLinks = [
    {
      name: "Dashboard",
      path: "/mentor/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Profile", path: "/mentor/profile", icon: <User size={20} /> },
    {
      name: "Sessions",
      path: "/mentor/sessions",
      icon: <Calendar size={20} />,
    },
    {
      name: "Availability",
      path: "/mentor/availability",
      icon: <Clock size={20} />,
    },
    {
      name: "Resources",
      path: "/mentor/resources",
      icon: <FileText size={20} />,
    },
    { name: "Mentees", path: "/mentor/mentees", icon: <Users size={20} /> },
    {
      name: "Analytics",
      path: "/mentor/analytics",
      icon: <BarChart size={20} />,
    },
  ];

  const menteeLinks = [
    {
      name: "Dashboard",
      path: "/mentee/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Profile", path: "/mentee/profile", icon: <User size={20} /> },
    {
      name: "Sessions",
      path: "/mentee/sessions",
      icon: <Calendar size={20} />,
    },
    {
      name: "Resources",
      path: "/mentee/resources",
      icon: <BookOpen size={20} />,
    },
    { name: "Mentors", path: "/mentee/mentors", icon: <Users size={20} /> },
    { name: "Goals", path: "/mentee/goals", icon: <Target size={20} /> },
  ];

  const links = userType === "mentor" ? mentorLinks : menteeLinks;

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } fixed left-0 top-0 h-screen transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          {!collapsed && (
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-echopurple-600 to-echoblue-500 bg-clip-text text-transparent"
            >
              EchoMentor
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu size={20} />
          </Button>
        </div>

        <nav className="flex-grow py-6 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "px-4"
                  } py-3 rounded-md transition-colors ${
                    isActive(link.path)
                      ? "bg-echopurple-50 text-echopurple-600 dark:bg-gray-800 dark:text-echopurple-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-echopurple-600 dark:hover:text-echopurple-400"
                  }`}
                >
                  {link.icon}
                  {!collapsed && (
                    <span className="ml-3 font-medium">{link.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              className={`${
                collapsed ? "justify-center px-2" : "justify-start"
              }`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <>
                  <Sun size={20} />
                  {!collapsed && <span className="ml-3">Light Mode</span>}
                </>
              ) : (
                <>
                  <Moon size={20} />
                  {!collapsed && <span className="ml-3">Dark Mode</span>}
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              className={`w-full ${
                collapsed ? "justify-center px-2" : "justify-start"
              } text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20`}
              onClick={logout}
            >
              <LogOut size={20} />
              {!collapsed && <span className="ml-3">Logout</span>}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
