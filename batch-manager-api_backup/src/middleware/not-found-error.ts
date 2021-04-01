import { AppError } from "./custom-errors";

export class NotFoundError extends AppError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}
