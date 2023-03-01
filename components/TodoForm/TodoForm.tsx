import styles from './TodoForm.module.css';
import {useEffect, useRef, useState} from "react";
import cn from "classnames";
import {useAppDispatch} from "../../custom-hooks/redux.hooks";
import {addNewTodo} from "../../store/reducers/todo.reducer";
import {SubmitHandler, useForm} from "react-hook-form";
import {motion} from 'framer-motion';
import {errorTypeTextTodo} from "../../helpers/validateForm";
import {Button} from "../Button/Button";

interface ITodoForm {
    textTodo: string;
}

export const TodoForm = () => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
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
            className={styles.form}
        >
            {isEditable ?
                <>
                    <input className={styles.input}
                           type="text"
                           placeholder={'Input todos'}
                           autoComplete={'off'}
                           {...rest}
                           ref={inputRefCallback}
                    />
                    <Button action={'done'} type={'submit'}/>
                    <Button action={'close'} onClick={unEditable} />
                </>
                :
                <div className={styles.titleWrapper} onClick={() => setIsEditable(true)}>
                    <Button action={'add'}/>
                    <p className={cn(styles.input, styles.p)}>Добавить задачу</p>
                </div>
            }
            {errors.textTodo &&
                <motion.p
                    className={styles.error}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.5, duration: 0.5}}
                >
                    {errorTypeTextTodo(errors.textTodo)}
                </motion.p>
            }
        </motion.form>
    );
};
