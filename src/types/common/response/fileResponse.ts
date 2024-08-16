import { DefaultResponse } from './response.ts';

export interface FileUploadResponseForm extends DefaultResponse<FileUploadResponse> {}

interface FileUploadResponse {
  fileUrl: string;
  fileKey: string;
}
