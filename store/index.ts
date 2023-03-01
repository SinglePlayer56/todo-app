import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import todoReducer from "./reducers/todo.reducer";
import {createWrapper} from "next-redux-wrapper";

function makeStore() {
    return configureStore({
        reducer: {
            todos: todoReducer
        },
        devTools: true
    })
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper(makeStore, {debug: false});

// export type RootState = ReturnType<typeof store.getState>;
