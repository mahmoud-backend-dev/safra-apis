
import { StatusCodes } from 'http-status-codes';
import { unlink } from 'fs/promises';
const errorHandlerMiddleware =async (err, req, res,next) => {
    const customError = {
        msg: err.message  || 'Something went wrong try again later',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`
        customError.statusCode = StatusCodes.BAD_REQUEST 
    };
    if (err.code && err.code === 'LIMIT_FILE_SIZE') { 
        customError.msg = `File size exceeds the limit (2 MB)`
        customError.statusCode = StatusCodes.BAD_REQUEST
    };
    if (err.code && err.code === 'LIMIT_UNEXPECTED_FILE') {
        customError.msg = `Too many files uploaded at once (Maximum 5 files allowed)`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    if (err.name === 'CastError') {
        customError.msg = `No Item found with id ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    };
    if (err.name === 'JsonWebTokenError') {
        customError.msg = `Invalid token, please login again...`;
        customError.statusCode = StatusCodes.UNAUTHORIZED;
    };
    if (err.name === 'TokenExpiredError') {
        customError.msg = `Expired token, please login again...`;
        customError.statusCode = StatusCodes.UNAUTHORIZED;
    };
    if (req.file) {
        await unlink(req.file.path);
    }
    res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;