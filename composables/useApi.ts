import axios from "./axios";
import type { AxiosRequestConfig } from "axios";

export function useApi<T>(path: string, options: AxiosRequestConfig = {}) {
  let headers: any = {};

  const token = useCookie("token");
  const csrf = useCookie("XSRF-TOKEN");

  if (csrf.value) {
    headers["X-XSRF-TOKEN"] = csrf.value;
  }

  if (token.value) {
    headers["Authorization"] = `Bearer ${token.value}`;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    };
  }

    const config = {
        ...options,
        headers: {
        ...headers,
        ...options.headers,
        withCredentials: true,
        },
    };

    return {
        get: (id?: string) => axios.get<T>(id ? `${path}/${id}` : path, config),
        post: (data: any) => axios.post<T>(path, data, config),
        put: (data: any) => axios.put<T>(path, data, config),
        delete: (id: string) => axios.delete<T>(`${path}/${id}`, config),
    }
}
