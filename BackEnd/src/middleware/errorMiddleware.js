// Global error handler — must have 4 params for Express to treat it as error middleware
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error("[ERROR]", err.message);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};
