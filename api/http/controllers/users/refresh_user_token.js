const jwt = require("jsonwebtoken");
const { DB } = require("../../../config/db-config");
const { secretOrKey } = require("../../../config/keys-config");

module.exports = async (req, res, next) => {
  try {
    const user = DB.get("users").find({ _id: req.user._id }).value();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const expiresIn = 1000 * 60 * 60 * 24 * 365;

    const payload = {
      _id: user._id,
      guid: user.guid,
      isActive: user.isActive,
      balance: user.balance,
      age: user.age,
      eyeColor: user.eyeColor,
      name: user.name,
      company: user.company,
      email: user.email,
      phone: user.phone,
      address: user.address,
    };

    // Sign Token
    jwt.sign(payload, secretOrKey, { expiresIn }, (err, token) => {
      if (err) {
        return res.status(500).json({ error: "Failed to sign token" });
      }
      return res.status(200).json({
        success: true,
        refreshUserToken: true,
        token: "Bearer " + token,
      });
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to refresh user token",
      endpoint: req.originalUrl,
    });
  }
};