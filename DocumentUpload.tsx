import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/FileUpload';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import { storageService, UploadProgressEvent } from '@/services/storageService';

interface DocumentUploadProps {
  documentType: 'resume' | 'certificate' | 'other';
  initialDocument?: string;
  onDocumentChange: (documentUrl: string) => void;
}

interface DocumentState {
  url: string;
  fileName: string;
  uploadProgress: number;
  isUploading: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documentType,
  initialDocument,
  onDocumentChange,
}) => {
  const [document, setDocument] = useState<DocumentState>({
    url: initialDocument || '',
    fileName: '',
    uploadProgress: 0,
    isUploading: false
  });
  const { user, setUser } = useUser();

  const handleDocumentUpload = async (file: File) => {
    try {
      setDocument(prev => ({ ...prev, isUploading: true, uploadProgress: 0 }));

      const handleProgress = (event: UploadProgressEvent) => {
        setDocument(prev => ({ ...prev, uploadProgress: event.progress }));
      };

      const response = await storageService.uploadFile(file, handleProgress);
      
      setDocument({
        url: response.url,
        fileName: response.fileName,
        uploadProgress: 100,
        isUploading: false
      });
      
      onDocumentChange(response.url);

      if (user) {
        setUser({
          ...user,
          [documentType]: response.url
        });
      }

      toast({
        title: 'Document Uploaded',
        description: `Your ${documentType} has been successfully uploaded.`,
      });
    } catch (error) {
      setDocument(prev => ({ ...prev, isUploading: false }));
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'There was an error uploading your document. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getDocumentTypeConfig = () => {
    switch (documentType) {
      case 'resume':
        return {
          label: 'Resume',
          acceptedFileTypes: '.pdf,.doc,.docx',
          description: 'Upload your latest resume (PDF, DOC, or DOCX format)',
        };
      case 'certificate':
        return {
          label: 'Certificate',
          acceptedFileTypes: '.pdf,.jpg,.jpeg,.png',
          description: 'Upload your certificates (PDF or image format)',
        };
      default:
        return {
          label: 'Document',
          acceptedFileTypes: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload your document',
        };
    }
  };

  const config = getDocumentTypeConfig();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-1">{config.label}</h3>
        <FileUpload
          onFileChange={handleDocumentUpload}
          acceptedFileTypes={config.acceptedFileTypes}
          label={`Upload ${config.label}`}
          description={config.description}
          maxSizeMB={10}
        />
      </div>

      {document.isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${document.uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Uploading... {Math.round(document.uploadProgress)}%
          </p>
        </div>
      )}

      {document.url && !document.isUploading && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Current {config.label}:</p>
          <div className="flex items-center gap-2">
            <a
              href={document.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              {document.fileName || `View ${config.label}`}
            </a>
            {document.fileName && (
              <span className="text-xs text-gray-500">
                ({document.fileName})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;