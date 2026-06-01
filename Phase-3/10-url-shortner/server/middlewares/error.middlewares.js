import { AppError, UnauthorizedError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {

    if (err instanceof AppError) {
        if (err.statusCode === 401) {
            res.clearCookie('token')
        }
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}