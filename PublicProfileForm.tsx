
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import DocumentUploader from "./DocumentUploader";

interface PublicProfileFormProps {
  initialName: string;
  initialTitle: string;
  initialBio: string;
  initialResume?: ResumeFile;
  initialCertificates?: string[];
  initialInterests: string[];
}

interface ResumeFile {
  name: string;
  uploadDate: string;
  size: string;
  file: File | null;
}

const PublicProfileForm = ({
  initialName,
  initialTitle,
  initialBio,
  initialResume,
  initialCertificates = [],
  initialInterests,
}: PublicProfileFormProps) => {
  const [name, setName] = useState(initialName);
  const [title, setTitle] = useState(initialTitle);
  const [bio, setBio] = useState(initialBio);
  const [resume, setResume] = useState<ResumeFile | undefined>(initialResume);
  const [interests, setInterests] = useState(initialInterests);
  const [newInterest, setNewInterest] = useState("");
  
  const { user, setUser } = useUser();
  
  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };
  
  const handleUpdateProfile = () => {
    // Update user context with the new data
    if (user) {
      setUser({
        ...user,
        name,
        bio,
      });
    }
    
    toast({
      title: "Profile Updated",
      description: "Your public profile has been successfully updated.",
    });
  };
  
  const handleResumeChange = (newResume: ResumeFile) => {
    setResume(newResume);
  };

  return (
    <div className="space-y-6">
      <DocumentUploader
        initialResumeFile={resume || {
          name: "No resume uploaded",
          uploadDate: new Date().toLocaleDateString(),
          size: "0 MB",
          file: null
        }}
        onDocumentChange={handleResumeChange}
      />
      <div className="space-y-3">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="title">Current Position/Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Brief description of yourself and your career/learning goals.
            Max 250 characters.
          </p>
        </div>

        <div className="grid gap-2">
          <Label>Areas of Interest</Label>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} className="group">
                {interest}
                <button 
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveInterest(interest)}
                >
                  ×
                </button>
              </Badge>
            ))}
            <div className="flex gap-2 items-center">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                className="h-6 w-32 text-sm"
                placeholder="Add interest..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
              />
              <Button
                variant="outline"
                size="sm"
                className="h-6 rounded-full px-2"
                onClick={handleAddInterest}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={handleUpdateProfile}>Update Public Profile</Button>
    </div>
  );
};

export default PublicProfileForm;
