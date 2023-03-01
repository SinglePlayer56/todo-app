import {RootState} from "../index";

export const getTodosSelector = (state: RootState) => state.todos.todos;
