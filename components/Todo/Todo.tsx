import {deleteTodo, ITodo, toggleStatus} from "../../store/reducers/todo.reducer";
import {useAppDispatch} from "../../custom-hooks/redux.hooks";
import styles from './Todo.module.css';
import {Checkbox} from "../Checkbox/Checkbox";
import DeleteIcon from './trash-cart-icon.svg';
import {motion} from 'framer-motion';
import {useState} from "react";

export const Todo = ({id, text, completed}: ITodo): JSX.Element => {
    const dispatch = useAppDispatch();
    const [deleteTodos, setDeleteTodos] = useState<boolean>(false);

    const variants = {
        create: {opacity: 1},
        delete: {opacity: 0, x: "100%"}
    }

    const onDeleteTodo = (id: string) => {
        setDeleteTodos(true)
        dispatch(deleteTodo(id));
    }

    const onToggleTodo = (id: string) => {
        dispatch(toggleStatus(id));
    }

    return (
        <motion.div
            animate={deleteTodos ? "delete" : "create"}
            variants={variants}
            initial={{opacity: 0, height:52}}
            transition={{duration: 0.5}}
            className={styles.todo}>
            <Checkbox setToggle={onToggleTodo} completed={completed} id={id}/>
            <p className={styles.text}>{text}</p>
            <DeleteIcon onClick={() => onDeleteTodo(id)} className={styles.delete}/>
        </motion.div>
    );
};
