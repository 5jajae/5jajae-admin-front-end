import { PageResponse } from '../common/response/pageResponse.ts';
import { PageRequest } from '../common/reqeust/pageRequest.ts';
import { DefaultResponse } from '../common/response/response.ts';

export interface StoreSearchRequestForm extends PageRequest {}

export interface StoreSaveRequestForm {
  name: string;
  descriptions: string | null;
  address: string;
  lat: number;
  lng: number;
  contactNumber: string | null;
  homepage: string | null;
  openingHours: string | null;
  representativeName: string | null;
  identificationNumber: string | null;
  items: string | null;

  imageUrls: string[] | null;
  itemTagIds: number[];
}

export interface StorePageResponseForm extends PageResponse<StoreResponse> {}

export interface StoreResponseForm extends DefaultResponse<StoreResponse> {}

export interface StoreResponse {
  id: number;
  name: string;
  descriptions: string | null;
  address: string;
  lat: number;
  lng: number;
  contactNumber: string | null;
  homepage: string | null;
  openingHours: string | null;
  representativeName: string | null;
  identificationNumber: string | null;
  items: string | null;
  isConstruction: boolean | null;

  imageUrls: StoreImageAdminResponse[] | null;
  itemTagIds: number[];
}

export interface StoreImageAdminResponse {
  id: number | null;
  fileKey: string;
  imageUrl: string;
}
