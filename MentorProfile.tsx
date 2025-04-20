
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileImageUpload from "@/components/profile/ProfileImageUpload";
import PublicProfileForm from "@/components/profile/PublicProfileForm";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import AccountSettings from "@/components/profile/AccountSettings";
import { useUser } from "@/contexts/UserContext";

const MentorProfile = () => {
  const { user } = useUser();
  
  // Use user data from context if available, otherwise use fallback values
  const [profileImage, setProfileImage] = useState(user?.avatar || "/placeholder.svg");
  const [name, setName] = useState(user?.name || "");
  const [title, setTitle] = useState("Senior Software Engineer at TechCorp"); // This could be added to the user context in the future
  const [bio, setBio] = useState("Software engineer with 8+ years of experience in full-stack development. Passionate about mentoring and helping others grow in their tech career.");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [location, setLocation] = useState("Bangalore, India");
  const [languages, setLanguages] = useState("English, Hindi");
  const [expertise, setExpertise] = useState(["JavaScript", "React", "Node.js", "Career Growth", "System Design"]);

  return (
    <DashboardLayout userType="mentor">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your public profile and personal information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>
                This information will be shown to potential mentees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProfileImageUpload 
                initialImage={profileImage} 
                onImageChange={setProfileImage}
                userName={name}
              />

              <PublicProfileForm
                initialName={name}
                initialTitle={title}
                initialBio={bio}
                initialImage={profileImage}
                initialInterests={expertise}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your private information that's not shared publicly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalInfoForm
                  initialEmail={email}
                  initialPhone={phone}
                  initialLocation={location}
                  initialLanguages={languages}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccountSettings />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorProfile;
