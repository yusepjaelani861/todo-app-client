export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  completed: boolean;
  completed_at: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

class TodoService {
  static list = async (payload: {
    page: string;
    status: string;
  }): Promise<ApiResponse<Todo[]>> => {
    let url = "/api/todos";
    if (payload.page) url += `?page=${payload.page}`;
    if (payload.status && payload.status !== "") url += `&status=${payload.status}`;
    const { data } = await useApi(url).get("");

    return data as ApiResponse<Todo[]>;
  };

  static get = async (payload: { id: number }): Promise<ApiResponse<Todo>> => {
    const { data } = await useApi(`/api/todos/${payload.id}`).get("");

    return data as ApiResponse<Todo>;
  }

  static store = async (payload: {
    title: string;
    description: string;
    due_date: string;
    status: string;
  }): Promise<ApiResponse<Todo>> => {
    const { data } = await useApi("/api/todos").post(payload);

    return data as ApiResponse<Todo>;
  };

  static update = async (payload: {
    id: number;
    title: string;
    description: string;
    due_date: string;
    status: string;
  }): Promise<ApiResponse<Todo>> => {
    const { data } = await useApi(`/api/todos/${payload.id}`).put({
      title: payload.title,
      description: payload.description,
      due_date: payload.due_date,
      status: payload.status,
    });

    return data as ApiResponse<Todo>;
  }

  static destroy = async (payload: { id: number }): Promise<ApiResponse<any>> => {
    const { data } = await useApi(`/api/todos/${payload.id}`).delete("");

    return data as ApiResponse<any>;
  }
}

export default TodoService;
