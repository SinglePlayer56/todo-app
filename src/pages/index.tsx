import {useAppDispatch, useAppSelector} from "../../custom-hooks/redux.hooks";
import {getTodos} from "../../store/reducers/todo.reducer";
import {useEffect} from "react";
import styles from '../styles/home.module.css';
import {Todo, TodoForm} from "../../components";

export default function Home(): JSX.Element {
    const todos = useAppSelector((state) => state.todos.todos);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    return (
        <>
            <h1 className={styles.h1}>Todos application</h1>
            <div className={styles.todos} >
                <TodoForm/>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                    />
                ))}
            </div>
        </>

    )
}
