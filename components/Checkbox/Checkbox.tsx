import styles from './Checkbox.module.css';
import {CheckboxProps} from "./Checkbox.props";
import cn from 'classnames';
export const Checkbox = ({setToggle, completed, id, className, ...props}: CheckboxProps): JSX.Element => {



    return (
        <div className={cn(styles.wrapper, className)} >
            <input
                className={styles.input}
                id={id}
                type="checkbox"
                onChange={() => setToggle(id)}
                checked={completed}
                {...props}
            />
            <label className={styles.checkbox} htmlFor={id}></label>
        </div>
    )
}
