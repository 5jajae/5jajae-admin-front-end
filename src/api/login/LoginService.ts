import { LoginRequestForm, LoginResponseForm } from '../../types/login/login.ts';
import ApiClient from '../apiClient.ts';

class LoginService {

  public login(loginForm: LoginRequestForm) {
    return ApiClient.post<LoginResponseForm>('/v1/ojajae/admin/auth/login', loginForm);
  }
}

export default new LoginService();
