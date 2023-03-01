import {ButtonAction, ButtonProps} from "./Button.props";
import cn from "classnames";
import styles from './Button.module.css'

export const Button = ({action, className, ...props}: ButtonProps): JSX.Element => {
    const IconButton = ButtonAction[action];
    return (
        <button
            className={cn(styles.button ,className)}
            aria-label={action}
            {...props}
        >
            <IconButton className={styles.icon}/>
        </button>
    )
}
