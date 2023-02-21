import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import * as process from "process";

export interface ITodo {
    id: string,
    text: string,
    completed: boolean
}

export interface ITodoReducer {
    todos: ITodo[];
    error: string | null;
    loading: boolean;
}

export const getTodos = createAsyncThunk<ITodo[], undefined, { rejectValue: string }>(
    'todo/getTodo',
    async function (_, {rejectWithValue}) {
        try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/todos`);

            return data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
        }
    }
);

export const addNewTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
    'todo/addNewTodo',
    async function (text: string, {rejectWithValue}) {
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/todo`,{text});

            return data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
        }
    }
)

export const toggleStatus = createAsyncThunk<ITodo, string, {rejectValue: string, state: {todos: ITodoReducer}}>(
    'todo/toggleStaus',
    async function (id, {rejectWithValue, getState}) {
        const todo = getState().todos.todos.find((todo) => todo.id === id);

        if (todo) {
            try {
                const {data} = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN}/todo/${id}`, {completed: !todo.completed})

                return data;
            } catch (e) {
                if (e instanceof Error) {
                    return rejectWithValue(e.message);
                }
            }
        } else {
            return rejectWithValue('No such todo in the list!');
        }
    }
)

export const deleteTodo = createAsyncThunk<string, string, {rejectValue: string}>(
    'todos/deleteTodo',
    async function (id, {rejectWithValue}){
        try {
            const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/todo/${id}`);

            return data.id;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
        }
    }
)

const initialState: ITodoReducer = {
    todos: [],
    error: null,
    loading: false
}

const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.loading = false;
            })
            .addCase(addNewTodo.pending,(state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
                state.loading = false;
            })
            .addCase(toggleStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                const todo = state.todos.find((todo) => todo.id === action.payload.id);
                if (todo) {
                    todo.completed = action.payload.completed;
                }
                state.loading = false;
            })
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
                state.loading = false;
            })
            .addMatcher(isError, (state, action:PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export default TodoSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}
