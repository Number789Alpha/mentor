import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from './button';
import { toast } from '@/hooks/use-toast';
import { storageService, UploadProgressEvent } from '@/services/storageService';

interface FileUploadProps {
  onFileChange: (file: File) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  label?: string;
  description?: string;
  isUploading?: boolean;
  uploadProgress?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  acceptedFileTypes = '*/*',
  maxSizeMB = 5,
  label = 'Upload File',
  description = `Drag and drop your file here, or click to select. Maximum size ${maxSizeMB}MB.`,
  isUploading = false,
  uploadProgress = 0
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    return storageService.validateFile(file, maxSizeMB, acceptedFileTypes);
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : isUploading ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'cursor-not-allowed' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={(e) => {
          e.preventDefault();
          if (!isUploading && fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFileTypes}
          onChange={handleFileSelect}
        />
        {isUploading ? (
          <Loader2 className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
        ) : (
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
        )}
        <div className="mt-4">
          <p className="text-sm font-medium">{isUploading ? 'Uploading...' : label}</p>
          <p className="mt-1 text-xs text-gray-500">
            {isUploading ? `${Math.round(uploadProgress)}% complete` : description}
          </p>
          {isUploading && (
            <div className="w-full mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-2">
            <span className="text-sm truncate">{selectedFile.name}</span>
            <span className="text-xs text-gray-500">
              ({Math.round(selectedFile.size / 1024)} KB)
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;