import {useAppSelector} from "../../custom-hooks/redux.hooks";
import {getTodos} from "../../store/reducers/todo.reducer";
import styles from '../styles/home.module.css';
import {Todo, TodoForm} from "../../components";
import {GetServerSideProps} from "next";
import {wrapper} from "../../store";
import {motion} from 'framer-motion';
import Head from "next/head";

export default function Home(): JSX.Element {
    const todos = useAppSelector((state) => state.todos.todos);

    return (
        <>
            <Head>
                <title>Todo Application</title>
                <meta name="description" content="My todo application" />
            </Head>
            <div className={styles.wrapper}>
                <h1 className={styles.h1}>Todos application</h1>
                <div className={styles.todos} >
                    <TodoForm/>
                    <motion.div className={styles.todosWrapper}>
                        {todos.map(todo => (
                            <Todo
                                key={todo.id}
                                id={todo.id}
                                text={todo.text}
                                completed={todo.completed}
                            />
                        ))}
                    </motion.div>
                </div>
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

