
import { MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; isCrisis?: boolean }[]>([
    { 
      text: "Hi there! 👋 I'm the EchoMentor assistant. If you need immediate crisis support, type 'help' or click the emergency button below.", 
      isUser: false 
    },
  ]);
  const [input, setInput] = useState("");
  const [showCrisisButton, setShowCrisisButton] = useState(true);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse = "I'm still learning! Please contact our support team for more help.";
      let isCrisis = false;
      
      // Crisis support logic
      if (input.toLowerCase().includes('help') || input.toLowerCase().includes('emergency') || input.toLowerCase().includes('crisis')) {
        botResponse = "I understand you might need immediate support. Our crisis counselors are available 24/7 at 1-800-XXX-XXXX. Would you like me to connect you with a counselor right now?";
        isCrisis = true;
      }
      // Regular response logic
      else if (input.toLowerCase().includes("mentor")) {
        botResponse = "You can find mentors by visiting our Find Mentors page or by signing up as a mentee.";
      } else if (input.toLowerCase().includes("price") || input.toLowerCase().includes("cost")) {
        botResponse = "We offer various pricing plans. Check our Pricing page for more details. We also offer a free trial session!";
      } else if (input.toLowerCase().includes("sign up") || input.toLowerCase().includes("register")) {
        botResponse = "You can sign up by clicking the Sign Up button in the navigation bar.";
      } else if (input.toLowerCase().includes("session")) {
        botResponse = "Sessions can be booked after signing up. Mentors set their availability, and you can choose a suitable time slot.";
      }

      setMessages(prev => [...prev, { text: botResponse, isUser: false, isCrisis }]);
      if (isCrisis) setShowCrisisButton(false);
    }, 1000);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 rounded-full w-14 h-14 shadow-lg"
        size="icon"
        aria-label="Open chatbot"
      >
        <MessageSquare />
      </Button>

      {isOpen && (
        <div className="fixed right-6 bottom-20 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-lg">EchoMentor Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 h-80 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-echopurple-600 text-white"
                      : message.isCrisis
                      ? "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 border-2 border-red-500"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {showCrisisButton && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => {
                    setInput("I need help");
                    handleSendMessage(new Event('submit') as unknown as React.FormEvent);
                  }}
                >
                  🆘 Get Emergency Support
                </Button>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button type="submit" size="sm">
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
