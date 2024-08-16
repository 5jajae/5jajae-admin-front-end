import { PageResponse } from '../common/response/pageResponse.ts';
import { PageRequest } from '../common/reqeust/pageRequest.ts';

export interface ItemTagSearchRequestForm extends PageRequest {}

export interface ItemTagPageResponseForm extends PageResponse<ItemTagResponseForm> {}

export interface ItemTagResponseForm {
  id: number;
  name: string;
  imageUrl: string;
}
