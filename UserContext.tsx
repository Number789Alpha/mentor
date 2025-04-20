
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "mentor" | "mentee";
  token: string;
  mentorId?: string;
  avatar?: string;
  bio?: string;
  sessionsBooked?: number;
  isPremium?: boolean;
}

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const authToken = localStorage.getItem('authToken');
      
      if (!storedUser || !authToken) {
        return null;
      }
      
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.role || !parsedUser.id || !['mentor', 'mentee'].includes(parsedUser.role)) {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        return null;
      }

      // Ensure all required fields are present
      const requiredFields = ['name', 'email', 'token'];
      const missingFields = requiredFields.filter(field => !parsedUser[field]);
      
      if (missingFields.length > 0) {
        console.error('Missing required user fields:', missingFields);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        return null;
      }
      
      return parsedUser;
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      return null;
    }
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    // Use window.location.replace to prevent back navigation to authenticated pages
    window.location.replace('/');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
