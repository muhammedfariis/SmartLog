export class ApiError extends Error {
    constructor(statusCode , Message){
        super(Message)
        this.statusCode = statusCode
    }
}
