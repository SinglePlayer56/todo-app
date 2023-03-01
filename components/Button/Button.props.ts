import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import deleteIcon from './trash-cart-icon.svg';
import addIcon from './add-icon.svg';
import closeIcon from './close-icon.svg';
import doneIcon from './done-icon.svg';


export const ButtonAction = {
    add: addIcon,
    close: closeIcon,
    done: doneIcon,
    delete: deleteIcon
};

type IconName = keyof typeof ButtonAction;

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    action: IconName;
}
