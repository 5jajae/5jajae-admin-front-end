import { PageResponse } from '../common/response/pageResponse.ts';
import { PageRequest } from '../common/reqeust/pageRequest.ts';

export interface StoreSearchRequestForm extends PageRequest {}

export interface StorePageResponseForm extends PageResponse<StoreResponseForm> {}

export interface StoreResponseForm {
  id: number;
  name: string;
  descriptions?: string;
  address: string;
  lat: number;
  lng: number;
  contactNumber?: string;
  homepage?: string;
  openingHours?: string;
  representativeName?: string;
  identificationNumber?: string;
  items?: string;
}
