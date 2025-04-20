
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

interface MessageMentorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentor: {
    name: string;
    image?: string;
  };
}

const MessageMentorDialog = ({ open, onOpenChange, mentor }: MessageMentorDialogProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${mentor.name}.`,
    });
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Message {mentor.name}</DialogTitle>
          <DialogDescription>
            Send a direct message to your mentor
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={mentor.image} alt={mentor.name} />
            <AvatarFallback>
              {mentor.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{mentor.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Usually responds within 24 hours
            </p>
          </div>
        </div>
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="resize-none"
        />
        <DialogFooter className="flex flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Be specific about what you'd like to discuss.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSend}>Send Message</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageMentorDialog;
