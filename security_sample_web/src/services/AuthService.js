import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "/api/v1";

class AuthService {
  async login(account_id, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        account_id,
        password,
      });
      if (
        response.data.success &&
        response.data.data &&
        response.data.data.jwt
      ) {
        const token = response.data.data.jwt;
        const decodedToken = jwtDecode(token);
        const user = {
          accountId: decodedToken.sub,
          role: decodedToken.role,
          name: decodedToken.name,
          token: token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } else {
        throw new Error(response.data.error?.message || "Login failed");
      }
    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다!", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authService = new AuthService();
export default authService;
