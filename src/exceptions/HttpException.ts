export class HttpException extends Error {
    public statusCode: number;
    public message: string;
    public error: string | null;
    public timestamp: string;
    public path: string | null;

    constructor(
        statusCode: number,
        message: string,
        error: string | null = null,
        path: string | null = null
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.timestamp = new Date().toISOString();
        this.path = path;

        Object.setPrototypeOf(this, HttpException.prototype);
    }

    public toJSON() {
        return {
            statusCode: this.statusCode,
            error: this.error,
            message: this.message,
            timestamp: this.timestamp,
            path: this.path
        };
    }

    public static fromError(error: Error, statusCode: number = 500): HttpException {
        return new HttpException(
            statusCode,
            error.message,
            error.name,
            null
        );
    }
}