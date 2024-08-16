import ApiClient from '../apiClient.ts';
import {
  StorePageResponseForm,
  StoreResponseForm,
  StoreSaveRequestForm,
  StoreSearchRequestForm,
} from '../../types/store/store.ts';

class StoreService {
  public saveStore(requestForm: StoreSaveRequestForm) {
    return ApiClient.post<void>('/v1/ojajae/admin/stores', requestForm);
  }

  public getStores(requestForm: StoreSearchRequestForm) {
    return ApiClient.get<StorePageResponseForm>(
      `/v1/ojajae/admin/stores?page=${requestForm.page}&size=${requestForm.size}`,
    );
  }

  public getStoresDetail(storeId: number) {
    return ApiClient.get<StoreResponseForm>(`/v1/ojajae/admin/stores/${storeId}`);
  }

  public updateStore(storeId: number, requestForm: StoreSaveRequestForm) {
    return ApiClient.put<void>(`/v1/ojajae/admin/stores/${storeId}`, requestForm);
  }

  public deleteStore() {
    return ApiClient.delete<void>('/v1/ojajae/admin/stores');
  }
}

export default new StoreService();
