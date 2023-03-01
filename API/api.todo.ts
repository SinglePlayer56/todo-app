import axios from "axios";
import * as process from "process";
import {ITodo} from "../store/reducers/todo.reducer";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOMAIN
})

interface ITodoApi {
    getTodos: () => Promise<ITodo[]>;
    getTodo:(id: string) => Promise<ITodo> ;
    createTodo: (text: string) => Promise<ITodo>;
    deleteTodo: (id: string) => Promise<ITodo>;
    toggleStatus: (id: string, isCompleted: boolean) => Promise<ITodo>;
}

class TodoAPI implements ITodoApi {
    async createTodo(text: string): Promise<ITodo> {
        try {
            const {data} = await instance.post<ITodo>(`/todo/` , { text });

            return data
        } catch (e:unknown) {
            if (e instanceof Error) {
                console.log(e.message)
            }
            throw e;
        }
    }

    async deleteTodo(id: string): Promise<ITodo> {
        try {
            const {data} = await instance.delete<ITodo>(`/todo/${id}`);

            return data
        } catch (e:unknown) {
            if (e instanceof Error) {
                console.log(e.message)
            }
            throw e;
        }
    }

    async getTodo(id: string): Promise<ITodo> {
        try {
            const {data} = await instance.get<ITodo>(`/todo/${id}`);

            return data;
        } catch (e:unknown) {
            if (e instanceof Error) {
                console.log(e.message)
            }
            throw e;
        }
    }

    async getTodos(): Promise<ITodo[]> {
        try {
            const response = await instance.get<ITodo[]>(`/todos`);

            return response.data;
        } catch (e:unknown) {
            if (e instanceof Error) {
                console.log(e.message)
            }
            throw e;
        }
    }

    async toggleStatus(id: string, isCompleted: boolean): Promise<ITodo> {
        try {
            const {data} = await instance.put<ITodo>(`/todo/${id}`, {completed: isCompleted});

            return data;
        } catch (e:unknown) {
            if (e instanceof Error) {
                console.log(e.message)
            }
            throw e;
        }
    }
}

const TodoApi = new TodoAPI();
export default TodoApi;
