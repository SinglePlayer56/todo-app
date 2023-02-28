import styles from './TodoForm.module.css';
import {useEffect, useRef, useState} from "react";
import cn from "classnames";
import AddIcon from './add-icon.svg';
import CloseIcon from './close-icon.svg';
import DoneIcon from './done-icon.svg';
import {useAppDispatch} from "../../custom-hooks/redux.hooks";
import {addNewTodo} from "../../store/reducers/todo.reducer";
import {SubmitHandler, useForm} from "react-hook-form";
import {motion} from 'framer-motion';
import {errorTypeTextTodo} from "../../helpers/validateForm";

interface ITodoForm {
    textTodo: string;
}

export const TodoForm = () => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ITodoForm>();
    const {ref, ...rest} = register('textTodo', {required: true, maxLength: 21});

    const variants = {
        invalid: {paddingBottom: 45},
        valid: {paddingBottom: 15}
    }

    useEffect(() => {
        if (inputRef.current && isEditable) {
            inputRef.current.focus();
        }
    }, [isEditable]);

    const unEditable = () => {
        setIsEditable(false);
        reset();
    }

    const onAddTodo = (text: string) => {
        dispatch(addNewTodo(text));
        setIsEditable(false);
    }

    const onSubmit: SubmitHandler<ITodoForm> = data => {
        onAddTodo(data.textTodo);
        reset();
    };

    const inputRefCallback = (e: HTMLInputElement | null) => {
        if (e) {
            ref(e);
            inputRef.current = e;
        }
    }

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={variants}
            initial={{paddingBottom: 15}}
            transition={{duration: 0.7}}
            animate={errors.textTodo ? "invalid" : "valid"}
            className={cn(styles.form, {
                [styles.invalid]: errors.textTodo
            })}
            action=""
        >
            {isEditable ?
                <>
                    <input className={styles.input}
                           type="text"
                           placeholder={'Input todos'}
                           {...rest}
                           ref={inputRefCallback}
                    />
                    <button className={styles.button} type={"submit"}>
                        <DoneIcon className={styles.done}/>
                    </button>
                    <button className={styles.button} onClick={unEditable}>
                        <CloseIcon className={styles.done}/>
                    </button>
                </>
                :
                <div className={styles.titleWrapper} onClick={() => setIsEditable(true)}>
                    <AddIcon className={styles.icon}/>
                    <p className={cn(styles.input, styles.p)}>Добавить задачу</p>
                </div>
            }
            {errors.textTodo &&
                <motion.p
                    className={styles.error}
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{ delay: 0.5, duration: 0.5}}
                >
                    {errorTypeTextTodo(errors.textTodo)}
                </motion.p>
            }
        </motion.form>
    )
}
