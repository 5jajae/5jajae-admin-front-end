import ApiClient from '../apiClient.ts';
import { ItemTagPageResponseForm, ItemTagSearchRequestForm } from '../../types/category/category.ts';

class ItemTageService {
  public getItemTagsPage(requestForm: ItemTagSearchRequestForm) {
    return ApiClient.get<ItemTagPageResponseForm>(
      `/v1/ojajae/admin/item-tags?page=${requestForm.page}&size=${requestForm.size}`,
    );
  }
}

export default new ItemTageService();
