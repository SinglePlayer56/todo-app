import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "../index";
import TodoApi from "../../API/api.todo";

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
            return TodoApi.getTodos();
        } catch (e: unknown) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            throw e;
        }
    }
);

export const addNewTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
    'todo/addNewTodo',
    async function (text: string, {rejectWithValue}) {
        try {
            return TodoApi.createTodo(text);
        } catch (e: unknown) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            throw e;
        }
    }
)

export const toggleStatus = createAsyncThunk<ITodo, string, { rejectValue: string, state: { todos: ITodoReducer } }>(
    'todo/toggleStaus',
    async function (id, {rejectWithValue, getState}) {
        const todo = getState().todos.todos.find((todo) => todo.id === id);

        if (todo) {
            try {
                return TodoApi.toggleStatus(id, !todo.completed);
            } catch (e) {
                if (e instanceof Error) {
                    return rejectWithValue(e.message);
                }
                throw e;
            }
        } else {
            return rejectWithValue('No such todo in the list!');
        }
    }
)

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async function (id, {rejectWithValue}) {
        try {
            const data = await TodoApi.deleteTodo(id);

            return data.id;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            throw e;
        }
    }
)

const isHydrateAction = (action: AnyAction): action is PayloadAction<RootState> => {
    return action.type === HYDRATE;
}

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
            .addCase(addNewTodo.pending, (state) => {
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
            .addMatcher(isHydrateAction, (state, action) => {
                state.todos = action.payload.todos.todos;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})

export default TodoSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}
