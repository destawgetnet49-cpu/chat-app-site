
import { useCallback, useEffect, useState } from "react";
import { authService } from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const token = localStorage.getItem("chatconnect_token");

      if (!token) {
        if (active) setLoading(false);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();

        if (active) setUser(currentUser);
      } catch (error) {
        localStorage.removeItem("chatconnect_token");

        if (active) {
          setUser(null);
          console.error(
            "Could not restore session:",
            error.response?.data?.message || error.message
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  const register = useCallback(async (details) => {
    return authService.register(details);
  }, []);

  const login = useCallback(async (credentials) => {
    const result = await authService.login(credentials);
    setUser(result.user);
    return result;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };
}
