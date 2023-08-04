const Validator = require("validator");
const jwt = require("jsonwebtoken");
const { DB } = require("../../config/db-config");
const isEmpty = require("../../utils/is-empty");
const { secretOrKey } = require("../../config/keys-config");

const validateReqBody = (data) => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = async (req, res, next) => {
  const { errors, isValid } = validateReqBody(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(422).json(errors); // Unprocessable Entity
  }

  try {
    let user = DB.get("users")
      .find({ email: req.body.email, password: req.body.password })
      .value();

    if (user) {
      const {
        _id,
        guid,
        isActive,
        balance,
        age,
        eyeColor,
        name,
        company,
        email,
        phone,
        address,
      } = user;

      const payload = {
        _id,
        guid,
        isActive,
        balance,
        age,
        eyeColor,
        name,
        company,
        email,
        phone,
        address,
      };

      // Sign Token
      jwt.sign(
        payload,
        secretOrKey,
        {
          expiresIn: "1y", // 1 year cookie
        },
        (err, token) => {
          if (err) {
            return res.status(500).json({ error: "Failed to sign token" });
          }
          return res.status(200).json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } else {
      errors.password = "Invalid login information";
      return res.status(404).json(errors);
    }
  } catch (err) {
    errors.err = err.toString();
    errors.login_user = "Failed to login_user";
    errors.endpoint = req.originalUrl;
    return res.status(500).json(errors);
  }
};