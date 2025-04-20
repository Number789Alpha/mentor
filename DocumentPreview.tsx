import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Download, X } from 'lucide-react';

interface DocumentPreviewProps {
  url: string;
  fileName: string;
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ url, fileName, onClose }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const getFileType = () => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension === 'pdf' ? 'pdf' : 'doc';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{fileName}</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownload}
              title="Download"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4 h-[80vh] overflow-auto">
          {getFileType() === 'pdf' ? (
            <div className="relative w-full h-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <p className="text-red-500">{error}</p>
                </div>
              )}
              <iframe
                src={url}
                className="w-full h-full border-0"
                title="PDF Preview"
                sandbox="allow-same-origin allow-scripts allow-forms"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setError('Failed to load PDF preview');
                }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Preview not available for this file type.
                <br />
                Please download to view.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
