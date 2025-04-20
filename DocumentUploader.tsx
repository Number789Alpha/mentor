
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DocumentPreview from './DocumentPreview';

interface ResumeFile {
  name: string;
  uploadDate: string;
  size: string;
  file: File | null;
}

interface DocumentUploaderProps {
  initialResumeFile: ResumeFile;
  onDocumentChange?: (file: ResumeFile | null) => void;
}

const DocumentUploader = ({ initialResumeFile, onDocumentChange }: DocumentUploaderProps) => {
  const [resumeFile, setResumeFile] = useState<ResumeFile>(initialResumeFile);
  const [showPreview, setShowPreview] = useState(false);
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast({
        title: "Upload Failed",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    // Convert file size to MB
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    // Format current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const newResumeFile = {
      name: file.name,
      uploadDate: formattedDate,
      size: `${fileSizeMB} MB`,
      file: file
    };

    try {
      setResumeFile(newResumeFile);
      if (onDocumentChange) {
        onDocumentChange(newResumeFile);
      }
      
      toast({
        title: "Resume Uploaded",
        description: "Your resume has been successfully uploaded.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading your file. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const viewDocument = () => {
    if (resumeFile.file) {
      // Create a URL for the file and open it in a new tab
      const url = URL.createObjectURL(resumeFile.file);
      window.open(url, '_blank');
    } else {
      toast({
        title: "Unable to View",
        description: "This is a placeholder. Upload a real document to view it.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <FileText className="h-8 w-8 text-gray-400" />
          <h3 className="font-medium">{resumeFile.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Uploaded on {resumeFile.uploadDate} • {resumeFile.size}
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(true)}
              title="Preview"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            {showPreview && resumeFile.file && (
              <DocumentPreview
                url={URL.createObjectURL(resumeFile.file)}
                fileName={resumeFile.name}
                onClose={() => setShowPreview(false)}
              />
            )}
            <label htmlFor="resume-replace">
              <div className="cursor-pointer">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Replace
                </Button>
              </div>
              <input 
                id="resume-replace" 
                type="file" 
                accept=".pdf,.doc,.docx" 
                className="hidden"
                onChange={handleResumeUpload}
              />
            </label>
          </div>
        </div>
      </div>
      <label htmlFor="document-upload">
        <div className="w-full cursor-pointer">
          <Button variant="outline" className="w-full cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Document
          </Button>
        </div>
        <input 
          id="document-upload" 
          type="file" 
          accept=".pdf,.doc,.docx,.txt,.rtf" 
          className="hidden"
          onChange={handleResumeUpload}
        />
      </label>
    </div>
  );
};

export default DocumentUploader;
