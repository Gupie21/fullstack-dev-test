const { DB } = require("../../../config/db-config");
const isEmpty = require("../../../utils/is-empty");


const validateReqParams = (data) => {
  let errors = {};
  data.userid = !isEmpty(data.userid) ? data.userid : "";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = async (req, res, next) => {
  try {
    const { errors, isValid } = validateReqParams(req.params);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = DB.get("users").find({ _id: req.params.userid }).value();

    if (!user) {
      errors.user = `There's no user with the id ${req.params.userid}`;
      return res.status(404).json(errors);
    }

    const picture = user?.picture;
    if (picture) {
      return res.status(200).json(picture);
    } else {
      errors.user = `User with id ${req.params.userid} doesn't have a picture`;
      return res.status(404).json(errors);
    }
  } catch (err) {
    const errors = {
      err: err.toString(),
      login_user: "Failed to get user picture",
      endpoint: req.originalUrl,
    };
    return res.status(500).json(errors);
  }
};