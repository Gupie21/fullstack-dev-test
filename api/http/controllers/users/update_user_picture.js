const { DB } = require("../../../config/db-config");
const isEmpty = require("../../../utils/is-empty");

const validateReqBody = (data) => {
  let errors = {};
  data.userid = !isEmpty(data.userid) ? data.userid : "";
  data.picture = !isEmpty(data.picture) ? data.picture : "";

  if (isEmpty(data.userid)) {
    errors.userid = "User ID is required";
  }
  if (isEmpty(data.picture)) {
    errors.picture = "Picture is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = async (req, res, next) => {
  const { errors, isValid } = validateReqBody(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = DB.get("users").find({ _id: req.body.userid }).value();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this user's picture" });
    }

    const payload = {
      picture: req.body.picture,
    };

    DB.get("users").find({ _id: req.user._id }).assign(payload).write();

    return res.status(204).json({ message: "Success" });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to update user picture",
      endpoint: req.originalUrl,
    });
  }
};