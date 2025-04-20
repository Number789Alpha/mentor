
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface FiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: () => void;
}

const FiltersDialog = ({ open, onOpenChange, onApplyFilters }: FiltersDialogProps) => {
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [experience, setExperience] = useState("any");
  const [availabilityToday, setAvailabilityToday] = useState(false);
  const [languages, setLanguages] = useState<string[]>(["English"]);
  const [ratings, setRatings] = useState("4");

  const handleSubmit = () => {
    onApplyFilters();
    onOpenChange(false);
  };

  const handleLanguageToggle = (language: string) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter(lang => lang !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
          <DialogDescription>
            Refine your mentor search with these filters
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label>Price Range (₹)</Label>
            <div className="pt-4 px-2">
              <Slider 
                defaultValue={[1000, 5000]}
                max={10000}
                step={100}
                onValueChange={(value) => setPriceRange(value as number[])}
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm">₹{priceRange[0]}</span>
                <span className="text-sm">₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select defaultValue={experience} onValueChange={setExperience}>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Experience</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="4-7">4-7 years</SelectItem>
                <SelectItem value="8-12">8-12 years</SelectItem>
                <SelectItem value="12+">12+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Minimum Rating</Label>
            <Select defaultValue={ratings} onValueChange={setRatings}>
              <SelectTrigger id="rating">
                <SelectValue placeholder="Select minimum rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Rating</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="5">5 Stars Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="availability">Available Today</Label>
            <Switch
              id="availability"
              checked={availabilityToday}
              onCheckedChange={setAvailabilityToday}
            />
          </div>

          <div className="space-y-3">
            <Label>Languages</Label>
            <div className="grid grid-cols-2 gap-2">
              {["English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali", "Gujarati"].map((lang) => (
                <div key={lang} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`lang-${lang}`} 
                    checked={languages.includes(lang)} 
                    onCheckedChange={() => handleLanguageToggle(lang)}
                  />
                  <Label htmlFor={`lang-${lang}`}>{lang}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Reset</Button>
          <Button onClick={handleSubmit}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
