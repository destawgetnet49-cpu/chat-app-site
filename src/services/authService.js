
import api from "./api";

export const authService = {
  async register({ username, email, password }) {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  },

  async login({ email, password }) {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!token) {
      throw new Error("The server did not return an authentication token.");
    }

    localStorage.setItem("chatconnect_token", token);

    return { token, user };
  },

  async logout() {
    localStorage.removeItem("chatconnect_token");
  },

  async getCurrentUser() {
    const response = await api.get("/auth/me");
    return response.data.user;
  },
};

export default authService;