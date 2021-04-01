export class AppError {
     name: string;
     status: number;
     message: string;
     stack?: string | undefined;
    constructor(message: any, status = 500) {
        // Save class name and status in properties
        // We can use any additional properties we want
        this.name = this.constructor.name;
        this.status = status;
        this.message = message;

        // Exclude our constructor from stack trace
        // (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
