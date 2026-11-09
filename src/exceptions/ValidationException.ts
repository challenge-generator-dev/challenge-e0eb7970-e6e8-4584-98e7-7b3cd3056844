import { HttpException } from './HttpException';

export interface ValidationError {
    field: string;
    message: string;
    value?: unknown;
}

export class ValidationException extends HttpException {
    public validationErrors: ValidationError[];

    constructor(
        message: string = 'Validation failed',
        validationErrors: ValidationError[] = []
    ) {
        super(400, message, 'Validation Error', null);
        this.validationErrors = validationErrors;
        Object.setPrototypeOf(this, ValidationException.prototype);
    }

    public static fromExpressValidatorErrors(errors: Array<{
        path: string;
        msg: string;
        value?: unknown;
    }>): ValidationException {
        const validationErrors: ValidationError[] = errors.map(error => ({
            field: error.path,
            message: error.msg,
            value: error.value
        }));

        return new ValidationException(
            'Validation failed for the provided data',
            validationErrors
        );
    }

    public static fromFieldErrors(fieldErrors: Record<string, string>): ValidationException {
        const validationErrors: ValidationError[] = Object.entries(fieldErrors).map(
            ([field, message]) => ({
                field,
                message
            })
        );

        return new ValidationException(
            'One or more validation errors occurred',
            validationErrors
        );
    }

    public getFirstError(): ValidationError | null {
        return this.validationErrors.length > 0 ? this.validationErrors[0] : null;
    }

    public getErrorForField(field: string): ValidationError | undefined {
        return this.validationErrors.find(error => error.field === field);
    }

    public hasField(field: string): boolean {
        return this.validationErrors.some(error => error.field === field);
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            validationErrors: this.validationErrors
        };
    }
}