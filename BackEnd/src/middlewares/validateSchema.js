export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    console.log({
      message: "Something went wrong on validateSchema",
      errorMessage: error.message,
      arrayErrors: error.errors.map((error) => error.message),
    });
    res.status(400).json({
      message: "Something went wrong on validateSchema",
      errorMessage: error.message,
      arrayErrors: error.errors.map((error) => error.message),
    });
  }
};
