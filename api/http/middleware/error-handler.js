const errorHandler = (err, req, res, next) => {
    // Log el error (puedes utilizar un sistema de registro como Winston o pino)
    console.error(err);

    // Verificar si el error es una instancia de Error
    if (err instanceof Error) {
        // Determinar el código de estado adecuado según el tipo de error
        let statusCode = 500;
        if (err.name === "ValidationError") {
            statusCode = 400; // Bad Request
        } else if (err.name === "UnauthorizedError") {
            statusCode = 401; // Unauthorized
        } else if (err.name === "NotFoundError") {
            statusCode = 404; // Not Found
        }

        // Enviar una respuesta al cliente
        res.status(statusCode).json({ error: err.message });
    } else {
        // Si el error no es una instancia de Error, asumimos un error 500
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = errorHandler;