import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { MessageCircle, Phone, AlertTriangle } from "lucide-react";
import { websocketService } from "@/services/websocketService";

interface CrisisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentorName?: string;
}

const CrisisDialog = ({ open, onOpenChange, mentorName }: CrisisDialogProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [chatMode, setChatMode] = useState<'chat' | 'call'>('chat');

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate connection success rate
      const isSuccess = Math.random() < 0.8;

      if (!isSuccess) {
        throw new Error('Could not connect at this time');
      }

      // Notify through websocket that a crisis support is needed
      websocketService.emit('crisis_support_needed', {
        type: chatMode,
        timestamp: new Date().toISOString(),
        mentorName
      });

      toast({
        title: `${chatMode === 'chat' ? 'Chat' : 'Call'} Connected`,
        description: `You're now connected to our crisis support team. ${mentorName ? `${mentorName} has been notified.` : ''}`,
        duration: 5000,
      });

      // Close the dialog after successful connection
      onOpenChange(false);

      // If it's a call, simulate opening a call interface
      if (chatMode === 'call') {
        window.open('tel:+1234567890', '_self');
      } else {
        // For chat, you could redirect to a chat interface or open a chat window
        // This is a mock implementation
        toast({
          title: "Chat Support",
          description: "A support representative will message you shortly.",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Please try again or call emergency services if needed.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Crisis Support
          </DialogTitle>
          <DialogDescription>
            Connect immediately with our crisis support team. We're here to help.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose how you'd like to connect with our support team:
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={chatMode === 'chat' ? "default" : "outline"}
              className={`flex items-center gap-2 ${chatMode === 'chat' ? 'bg-red-600 hover:bg-red-700' : ''}`}
              onClick={() => setChatMode('chat')}
            >
              <MessageCircle className="h-4 w-4" />
              Chat Now
            </Button>

            <Button
              variant={chatMode === 'call' ? "default" : "outline"}
              className={`flex items-center gap-2 ${chatMode === 'call' ? 'bg-red-600 hover:bg-red-700' : ''}`}
              onClick={() => setChatMode('call')}
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
          </div>

          <div className="mt-4">
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : `Connect via ${chatMode === 'chat' ? 'Chat' : 'Call'}`}
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            If this is a life-threatening emergency, please call your local emergency services immediately.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CrisisDialog;