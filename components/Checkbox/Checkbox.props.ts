import {DetailedHTMLProps, InputHTMLAttributes} from "react";

export interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    completed: boolean;
    id: string;
    setToggle: (id: string) => void;
}
