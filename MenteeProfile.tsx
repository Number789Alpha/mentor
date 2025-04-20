
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PublicProfileForm from "@/components/profile/PublicProfileForm";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import DocumentUploader from "@/components/profile/DocumentUploader";
import AccountSettings from "@/components/profile/AccountSettings";
import ProfileImageUpload from "@/components/profile/ProfileImageUpload";
import { useUser } from "@/contexts/UserContext";

const MenteeProfile = () => {
  const { user } = useUser();
  
  // Use user data from context if available, otherwise use fallback values
  const [profileImage, setProfileImage] = useState(user?.avatar || "/placeholder.svg");
  const [name, setName] = useState(user?.name || "");
  const [title, setTitle] = useState("Business Analyst at DataCorp");
  const [bio, setBio] = useState("Business analyst with 3 years of experience, looking to transition into product management. Passionate about user experience and data-driven decision making.");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("+91 98765 54321");
  const [location, setLocation] = useState("Bangalore, India");
  const [languages, setLanguages] = useState("English, Hindi, Kannada");
  const [interests, setInterests] = useState(["Product Management", "UX Research", "Analytics", "Leadership"]);

  const initialResumeFile = {
    name: "Resume.pdf",
    uploadDate: "Apr 5, 2025",
    size: "1.2 MB",
    file: null
  };

  return (
    <DashboardLayout userType="mentee">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your profile and personal information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>
                This information will be shown to mentors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileImageUpload 
                initialImage={profileImage} 
                onImageChange={setProfileImage}
                userName={name}
              />
              
              <PublicProfileForm 
                initialName={name}
                initialTitle={title}
                initialBio={bio}
                initialInterests={interests}
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
                <CardTitle>Documents & Resume</CardTitle>
                <CardDescription>
                  Upload your resume and important documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUploader initialResumeFile={initialResumeFile} />
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

export default MenteeProfile;
