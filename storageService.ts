import { toast } from '@/hooks/use-toast';

export interface UploadProgressEvent {
  loaded: number;
  total: number;
  progress: number;
}

export interface UploadResponse {
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

export class StorageService {
  private static instance: StorageService;
  private readonly API_URL = '/api/upload'; // Update with your actual API endpoint

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  public async uploadFile(
    file: File,
    onProgress?: (event: UploadProgressEvent) => void
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();
      
      // For development/demo purposes, simulate upload with a delay
      if (process.env.NODE_ENV === 'development') {
        return await this.simulateUpload(file, onProgress);
      }

      return await new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            onProgress({
              loaded: event.loaded,
              total: event.total,
              progress: (event.loaded / event.total) * 100
            });
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            resolve({
              url: response.url,
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type
            });
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error occurred during upload'));
        });

        xhr.open('POST', this.API_URL);
        xhr.send(formData);
      });
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  private async simulateUpload(
    file: File,
    onProgress?: (event: UploadProgressEvent) => void
  ): Promise<UploadResponse> {
    const totalTime = 2000; // 2 seconds for simulation
    const steps = 10;
    const stepTime = totalTime / steps;

    for (let i = 1; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepTime));
      if (onProgress) {
        onProgress({
          loaded: (file.size / steps) * i,
          total: file.size,
          progress: (i / steps) * 100
        });
      }
    }

    // Simulate a response with a local URL
    return {
      url: URL.createObjectURL(file),
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    };
  }

  public validateFile(file: File, maxSizeMB: number, acceptedTypes: string): boolean {
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: 'Error',
        description: `File size must be less than ${maxSizeMB}MB`,
        variant: 'destructive'
      });
      return false;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = acceptedTypes
      .split(',')
      .map(type => type.trim().replace('.', '').toLowerCase());

    if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
      toast({
        title: 'Error',
        description: `Invalid file type. Please upload ${acceptedTypes}`,
        variant: 'destructive'
      });
      return false;
    }

    return true;
  }
}

export const storageService = StorageService.getInstance();