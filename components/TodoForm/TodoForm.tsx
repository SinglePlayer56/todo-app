import styles from './TodoForm.module.css';
import {ChangeEvent, useEffect, useRef, useState} from "react";
import cn from "classnames";
import AddIcon from './add-icon.svg';
import CloseIcon from './close-icon.svg';
import DoneIcon from './done-icon.svg';
import {useAppDispatch} from "../../custom-hooks/redux.hooks";
import {addNewTodo} from "../../store/reducers/todo.reducer";

export const TodoForm = () => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current && isEditable) {
            inputRef.current.focus();
        }
    },[isEditable]);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const unEditable = () => {
        setIsEditable(false);
        setText('');
    }

    const onAddTodo = (text: string) => {
        dispatch(addNewTodo(text));
        setIsEditable(false);
        setText('');
    }

    return (
        <form className={styles.form} action="">
            {isEditable ?
                <>
                    <input className={styles.input}
                           type="text"
                           placeholder={'Input todos'}
                           value={text}
                           onChange={handleChangeInput}
                           ref={inputRef}
                    />
                    <DoneIcon className={styles.done} onClick={() => onAddTodo(text)}/>
                    <CloseIcon className={styles.done} onClick={unEditable}/>
                </>
                :
                <div className={styles.titleWrapper} onClick={() => setIsEditable(true)}>
                    <AddIcon className={styles.icon}/>
                    <p className={cn(styles.input, styles.p)}>Добавить задачу</p>
                </div>
            }
        </form>
    )
}
