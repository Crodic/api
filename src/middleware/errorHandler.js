const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const messageError = err.message || 'Internal Server Error';
    const stack = err.stack || null;
    const customError = {
        status: statusCode,
        message: messageError,
        stack: stack,
    };
    if (process.env.ENV == 'production') delete customError.stack;
    return res.status(statusCode).json(customError);
};

module.exports = {
    errorHandler,
};
