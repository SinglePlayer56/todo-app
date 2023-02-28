import {FieldError} from "react-hook-form";

export const errorTypeTextTodo = (error: FieldError) => {
    switch (error.type) {
        case "required":
            return "Field is required"
        case "maxLength":
            return "Maximum number of characters "
    }
}
