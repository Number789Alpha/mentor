import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResourceUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload?: (resourceData: ResourceData) => void;
}

interface ResourceData {
  title: string;
  description: string;
  type: string;
  file: File | null;
  visibility: "shared" | "personal";
}

const ResourceUploadDialog = ({ open, onOpenChange, onUpload }: ResourceUploadDialogProps) => {
  const [resourceData, setResourceData] = useState<ResourceData>({
    title: "",
    description: "",
    type: "Document",
    file: null,
    visibility: "personal"
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setResourceData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async () => {
    if (!resourceData.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide a title for the resource.",
        variant: "destructive",
      });
      return;
    }

    if (!resourceData.file) {
      toast({
        title: "File Required",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would typically upload the file to your storage service
      // and save the resource metadata to your database
      if (onUpload) {
        await onUpload(resourceData);
      }
      
      toast({
        title: "Resource Uploaded",
        description: "Your resource has been uploaded successfully.",
      });
      
      // Reset form and close dialog
      setResourceData({
        title: "",
        description: "",
        type: "Document",
        file: null,
        visibility: "personal"
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Upload Resource</DialogTitle>
          <DialogDescription>
            Upload a resource to share with your mentees or keep for personal reference.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={resourceData.title}
              onChange={(e) => setResourceData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter resource title"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={resourceData.description}
              onChange={(e) => setResourceData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the resource..."
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Resource Type</Label>
            <Select
              value={resourceData.type}
              onValueChange={(value) => setResourceData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Document">Document</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Presentation">Presentation</SelectItem>
                <SelectItem value="Spreadsheet">Spreadsheet</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select
              value={resourceData.visibility}
              onValueChange={(value: "shared" | "personal") => 
                setResourceData(prev => ({ ...prev, visibility: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Only</SelectItem>
                <SelectItem value="shared">Shared with Mentees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="file">Upload File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
              />
              {resourceData.file && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setResourceData(prev => ({ ...prev, file: null }))}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Max file size: 10MB. Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Resource
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceUploadDialog;