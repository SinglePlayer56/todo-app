import {deleteTodo, ITodo, toggleStatus} from "../../store/reducers/todo.reducer";
import {useAppDispatch} from "../../custom-hooks/redux.hooks";
import styles from './Todo.module.css';
import {motion} from 'framer-motion';
import React, {useState} from "react";
import {Button, Checkbox} from "components";

export const Todo = React.memo(({id, text, completed}: ITodo): JSX.Element => {
    const dispatch = useAppDispatch();
    const [deleteTodos, setDeleteTodos] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const variants = {
        create: {opacity: 1},
        delete: {opacity: 0, height: 0, padding: 0, marginBottom: 0, width: 0},
        line: {width: '100%'},
        noLine: {width: 0}
    }

    const onDeleteTodo = async (id: string) => {
        setIsLoading(true);
        setDeleteTodos(true);
        await dispatch(deleteTodo(id));
        setIsLoading(false);
    }

    const onToggleTodo = async (id: string) => {
        setIsLoading(true);
        await dispatch(toggleStatus(id));
        setIsLoading(false);
    }

    return (
        <motion.div
            animate={deleteTodos ? "delete" : "create"}
            variants={variants}
            initial={{opacity: 0}}
            transition={{duration: 0.5}}
            style={{overflow: 'hidden'}}
            className={styles.todo}>
            <Checkbox setToggle={onToggleTodo} isLoading={isLoading} completed={completed} id={id}/>
            <p className={styles.textWrapper}>
                <motion.span
                    className={styles.line}
                    initial={{width: 0}}
                    animate={completed ? "line" : "noLine"}
                    variants={variants}
                >
                </motion.span>
                <span className={styles.text}>{text}</span>
            </p>
            <Button
                action={'delete'}
                disabled={isLoading}
                onClick={() => onDeleteTodo(id)}
            />
        </motion.div>
    );
});

Todo.displayName = 'Todo';
