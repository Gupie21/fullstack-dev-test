const { DB } = require("../../../config/db-config");

module.exports = async (req, res, next) => {
  let { limit } = req.query;

  const defaultLimit = 10;
  const maxLimit = 100;

  if (typeof limit === "string") {
    limit = Number(limit);
  }

  if (isNaN(limit) || limit <= 0 || limit > maxLimit) {
    return res.status(400).json({ error: "Invalid limit value" });
  }

  if (!limit) {
    limit = defaultLimit;
  }

  try {
    const users = DB.get("users").slice(0, limit).value();

    return res.status(200).json(users);
  } catch (err) {
    let errors = {};
    errors.get_users = "Failed to get users";
    errors.endpoint = "get_users";
    return res.status(500).json(errors);
  }
};