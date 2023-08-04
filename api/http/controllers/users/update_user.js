const { DB } = require("../../../config/db-config");
const isEmpty = require("../../../utils/is-empty");

const validateReqBody = (data) => {
  let errors = {};
  data._id = !isEmpty(data._id) ? data._id : "";

  if (isEmpty(data._id)) {
    errors._id = "user._id is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const updateUser = (userId, payload) => {
  DB.get("users").find({ _id: userId }).assign(payload).write();
};

module.exports = async (req, res, next) => {
  const { errors, isValid } = validateReqBody(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = DB.get("users").find({ _id: req.body._id }).value();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this user" });
    }

    const payload = {};

    if (req.body.isActive) payload.isActive = req.body.isActive;
    if (req.body.balance) payload.balance = req.body.balance;
    if (req.body.picture) payload.picture = req.body.picture;
    if (req.body.age) payload.age = req.body.age;
    if (req.body.eyeColor) payload.eyeColor = req.body.eyeColor;

    if (req.body.name) {
      const { last = "", first = "" } = req.body.name;
      const name = {
        first,
        last,
      };
      payload.name = name;
    }
    if (req.body.company) payload.company = req.body.company;
    if (req.body.email) payload.email = req.body.email;
    
    if (req.body.phone) payload.phone = req.body.phone;
    if (req.body.address) payload.address = req.body.address;

    console.log(payload, "this is payload");
    updateUser(req.user._id, payload);

    next();
  } catch (err) {
    return res.status(500).json({
      error: "Failed to update user",
      endpoint: req.originalUrl,
    });
  }
};