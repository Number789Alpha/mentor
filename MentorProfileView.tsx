
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare } from "lucide-react";
import BookingDialog from "./BookingDialog";
import MessageMentorDialog from "./MessageMentorDialog";

interface MentorProfileViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentor: {
    id: number;
    name: string;
    title: string;
    bio: string;
    expertise: string[];
    experience: string;
    rating: number;
    reviews: number;
    pricing: string;
    availability: string;
    image: string;
    languages: string[];
  };
}

const MentorProfileView = ({ open, onOpenChange, mentor }: MentorProfileViewProps) => {
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Mentor Profile</DialogTitle>
            <DialogDescription>
              View detailed information about this mentor
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 border-2 border-primary/10">
                <AvatarImage src={mentor.image} alt={mentor.name} />
                <AvatarFallback>
                  {mentor.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center mt-3">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-medium">{mentor.rating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  ({mentor.reviews} reviews)
                </span>
              </div>
              <div className="mt-4 w-full space-y-2">
                <BookingDialog
                  mentorName={mentor.name}
                  trigger={
                    <Button className="w-full">Book Free Trial</Button>
                  }
                />
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowMessageDialog(true)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Mentor
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-xl font-bold">{mentor.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{mentor.title}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-gray-700 dark:text-gray-300">{mentor.bio}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-1">Experience</h3>
                  <p>{mentor.experience}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Languages</h3>
                  <p>{mentor.languages.join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Pricing</h3>
                  <p className="font-medium">{mentor.pricing}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Availability</h3>
                  <p>{mentor.availability}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {showMessageDialog && (
        <MessageMentorDialog 
          open={showMessageDialog}
          onOpenChange={setShowMessageDialog}
          mentor={mentor}
        />
      )}
    </>
  );
};

export default MentorProfileView;
