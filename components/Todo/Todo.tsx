import {deleteTodo, ITodo, toggleStatus} from "../../store/reducers/todo.reducer";
import {useAppDispatch} from "../../custom-hooks/redux.hooks";
import styles from './Todo.module.css';
import {motion} from 'framer-motion';
import React, {useState} from "react";
import {Button, Checkbox} from "components";
import {useSwipeable} from "react-swipeable";

export const Todo = React.memo(({id, text, completed}: ITodo): JSX.Element => {
    const dispatch = useAppDispatch();
    const [deleteTodos, setDeleteTodos] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [x, setX] = useState<number | string>(0);

    const handlersSwiper = useSwipeable({
        onSwiped: eventData => {
            if (eventData.deltaX > 150) {
                setX('100');
            } else {
                setX(0);
            }
        },
        onSwiping: eventData => {
            if (eventData.deltaX < -120) {
                setX(0);
            } else {
                setX(eventData.deltaX);
            }
        },
        onSwipedRight: eventData => {
            if (eventData.deltaX > 150) {
                onDeleteTodo(id);
            }
        }
    })

    const variants = {
        create: {opacity: 1, transition: {duration: 0.5}},
        delete: {opacity: 0, height: 0, padding: 0, marginBottom: 0, width: '100%', translateX: '100%',transition: {duration: 0.5}},
        line: {width: '100%'},
        noLine: {width: 0},
        swipeRight: {translateX: x, transition: {duration: 0.05}, transitionTimingFunction: 'linear'}
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
            animate={[deleteTodos ? "delete" : "create", "swipeRight"]}
            variants={variants}
            initial={{opacity: 0, overflow: "hidden"}}
            className={styles.todo}
            {...handlersSwiper}
        >
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
