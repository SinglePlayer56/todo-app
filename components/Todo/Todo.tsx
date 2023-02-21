import {deleteTodo, ITodo, toggleStatus} from "../../store/reducers/todo.reducer";
import {useAppDispatch} from "../../custom-hooks/redux.hooks";
import styles from './Todo.module.css';
import {Checkbox} from "../Checkbox/Checkbox";
import DeleteIcon from './trash-cart-icon.svg';

export const Todo = ({id, text, completed}: ITodo): JSX.Element => {
    const dispatch = useAppDispatch();

    const onDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id));
    }

    const onToggleTodo = (id: string) => {
        dispatch(toggleStatus(id));
    }

    return (
        <div className={styles.todo}>
            <Checkbox setToggle={onToggleTodo} completed={completed} id={id}/>
            <p className={styles.text}>{text}</p>
            <DeleteIcon onClick={() => onDeleteTodo(id)} className={styles.delete}/>
        </div>
    );
};
