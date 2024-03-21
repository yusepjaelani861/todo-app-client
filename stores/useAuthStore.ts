import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";

type User = {
  id: number;
  name: string;
  email: string;
};

type Credentials = {
  email: string;
  password: string;
};

type Register = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useAuthUser = defineStore("auth", () => {
  const user = ref<User | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  async function fetchUser() {
    try {
      const { data } = await useApi("/api/user/me").get();
      user.value = (data as { data: User }).data;
    } catch (e) {
      user.value = null;
    }
  }

  async function login(credentials: Credentials) {
    await useApi("/sanctum/csrf-cookie").get();

    const login = await useApi("/api/login").post(credentials);

    await fetchUser();

    navigateTo("/");

    return login;
  }

  async function register(info: Register) {
    await useApi("/sanctum/csrf-cookie").get();

    const register = await useApi("/api/register").post(info);

    await fetchUser();

    return register;
  }

  async function logout() {
    await useApi("/api/logout").post({});
    user.value = null;

    navigateTo("/");
  }

  return {
    user,
    isLoggedIn,
    fetchUser,
    login,
    register,
    logout,
  };
});
