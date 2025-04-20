import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { format, isWeekend, isBefore, addDays } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BlockedDate {
  date: string;
  reason: string;
}

interface BlockedDateManagerProps {
  blockedDates: BlockedDate[];
  onBlockedDatesChange: (dates: BlockedDate[]) => void;
}

const BlockedDateManager = ({ blockedDates, onBlockedDatesChange }: BlockedDateManagerProps) => {
  const [showBlockDateDialog, setShowBlockDateDialog] = React.useState<boolean>(false);
  const [newBlockedDate, setNewBlockedDate] = React.useState<Date | undefined>(undefined);
  const [blockReason, setBlockReason] = React.useState<string>('');

  const handleAddBlockedDate = async () => {
    try {
      if (!newBlockedDate || !blockReason) {
        toast({
          title: "Missing Information",
          description: "Please select a date and provide a reason.",
          variant: "destructive",
        });
        return;
      }

      // Validate date is not in the past
      if (newBlockedDate < new Date(new Date().setHours(0, 0, 0, 0))) {
        toast({
          title: "Invalid Date",
          description: "Cannot block dates in the past.",
          variant: "destructive",
        });
        return;
      }

      // Check for duplicate dates
      const formattedDate = format(newBlockedDate, "MMM d, yyyy");
      if (blockedDates.some(block => block.date === formattedDate)) {
        toast({
          title: "Date Already Blocked",
          description: "This date is already in your blocked dates list.",
          variant: "destructive",
        });
        return;
      }

      // Add new blocked date
      const newBlockedDates = [...blockedDates, {
        date: formattedDate,
        reason: blockReason
      }];

      onBlockedDatesChange(newBlockedDates);
      setShowBlockDateDialog(false);
      setNewBlockedDate(undefined);
      setBlockReason("");
    } catch (error) {
      console.error('Error adding blocked date:', error);
      toast({
        title: "Error",
        description: "Failed to add blocked date. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveBlockedDate = (index: number) => {
    const updatedDates = [...blockedDates];
    updatedDates.splice(index, 1);
    onBlockedDatesChange(updatedDates);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blocked Dates</CardTitle>
        <CardDescription>Manage dates when you're unavailable</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => setShowBlockDateDialog(true)}
            className="w-full justify-center py-8 border-dashed"
          >
            <Plus className="mr-2 h-4 w-4" />
            Block a Date
          </Button>

          {blockedDates.length > 0 ? (
            <div className="space-y-2">
              {blockedDates.map((block, index) => (
                <div
                  key={block.date}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{block.date}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {block.reason}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveBlockedDate(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No blocked dates set
            </p>
          )}
        </div>
      </CardContent>

      <Dialog open={showBlockDateDialog} onOpenChange={setShowBlockDateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block a Date</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newBlockedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newBlockedDate ? format(newBlockedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newBlockedDate}
                    onSelect={setNewBlockedDate}
                    disabled={(date) =>
                      isBefore(date, addDays(new Date(), -1)) ||
                      isWeekend(date)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Reason</Label>
              <Input
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Why are you blocking this date?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDateDialog(false)}>Cancel</Button>
            <Button onClick={handleAddBlockedDate}>Block Date</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BlockedDateManager;