import {useAppSelector} from "../../custom-hooks/redux.hooks";
import {getTodos} from "../../store/reducers/todo.reducer";
import styles from '../styles/home.module.css';
import {Todo, TodoForm} from "../../components";
import {GetServerSideProps} from "next";
import {wrapper} from "../../store";

export default function Home(): JSX.Element {
    const todos = useAppSelector((state) => state.todos.todos);

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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {

    await store.dispatch(getTodos());
    return {
        props: {
        }
    }
});

