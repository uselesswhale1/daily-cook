import { ValidationScheme } from './validationScheme.interface';

export interface UseForm {
    initialForm: Record<string, any>
    validations: ValidationScheme,
    onSubmit?: Function
}
