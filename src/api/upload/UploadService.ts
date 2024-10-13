import ApiClient from '../apiClient.ts';
import { FileUploadResponseForm } from '../../types/common/response/fileResponse.ts';
import { AxiosResponse } from 'axios';

class UploadService {
  IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

  public storeUploadImage(file: File) {
    if (!file) {
      console.error('file is empty');
      return new Promise<AxiosResponse<FileUploadResponseForm>>((_, reject) => {
        reject('file is empty');
      });
    }

    if (!this.IMAGE_EXTENSIONS.includes(this.getFileExtension(file.name))) {
      console.error(
        `invalid extension\npossible extensions: ${this.IMAGE_EXTENSIONS.join(', ')}\ncurrent extension: ${this.getFileExtension(file.name)}`,
      );
      return new Promise<AxiosResponse<FileUploadResponseForm>>((_, reject) => {
        reject(
          `invalid extension\npossible extensions: ${this.IMAGE_EXTENSIONS.join(', ')}\ncurrent extension: ${this.getFileExtension(file.name)}`,
        );
      });
    }

    return this.upload('stores', file);
  }

  public storeUploadThumbnailImage(file: File) {
    if (!file) {
      console.error('file is empty');
      return new Promise<AxiosResponse<FileUploadResponseForm>>((_, reject) => {
        reject('file is empty');
      });
    }

    if (!this.IMAGE_EXTENSIONS.includes(this.getFileExtension(file.name))) {
      console.error(
        `invalid extension\npossible extensions: ${this.IMAGE_EXTENSIONS.join(', ')}\ncurrent extension: ${this.getFileExtension(file.name)}`,
      );
      return new Promise<AxiosResponse<FileUploadResponseForm>>((_, reject) => {
        reject(
          `invalid extension\npossible extensions: ${this.IMAGE_EXTENSIONS.join(', ')}\ncurrent extension: ${this.getFileExtension(file.name)}`,
        );
      });
    }

    return this.upload('storeThumbnail', file);
  }

  public itemTagsUploadImage(file: File) {
    if (!file) {
      console.error('file is empty');
      return new Promise<AxiosResponse<FileUploadResponseForm>>((_, reject) => {
        reject('file is empty');
      });
    }

    if (!this.IMAGE_EXTENSIONS.includes(this.getFileExtension(file.name))) {
      console.error(
        `invalid extension\npossible extensions: ${this.IMAGE_EXTENSIONS.join(', ')}\ncurrent extension: ${this.getFileExtension(file.name)}`,
      );
      return new Promise<AxiosResponse<FileUploadResponseForm>>((_, reject) => {
        reject(
          `invalid extension\npossible extensions: ${this.IMAGE_EXTENSIONS.join(', ')}\ncurrent extension: ${this.getFileExtension(file.name)}`,
        );
      });
    }

    return this.upload('item-tags', file);
  }

  private upload(prefix: string, file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return ApiClient.post<FileUploadResponseForm>(`/v1/ojajae/admin/upload/${prefix}`, formData, {
      'Content-Type': 'multipart/form-data',
    });
  }

  private getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() ?? '';
  }
}

export default new UploadService();
