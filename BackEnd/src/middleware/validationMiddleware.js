// Validates that required fields exist and are non-empty in req.body
export const requireFields = (...fields) => (req, res, next) => {
  const missing = fields.filter((f) => req.body[f] === undefined || req.body[f] === "");
  if (missing.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(", ")}` });
  }
  next();
};

// Validates that a numeric field is a positive number
export const requirePositiveNumber = (...fields) => (req, res, next) => {
  for (const f of fields) {
    const val = Number(req.body[f]);
    if (isNaN(val) || val <= 0) {
      return res.status(400).json({ message: `${f} must be a positive number` });
    }
  }
  next();
};
