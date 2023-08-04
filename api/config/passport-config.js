const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { DB } = require("./db-config");
const keys = require("./keys-config");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey,
};

async function verifyJwtPayload(jwt_payload, done) {
  try {
    let user = await DB.get("users").find({ _id: jwt_payload._id }).value();

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, verifyJwtPayload));
};
