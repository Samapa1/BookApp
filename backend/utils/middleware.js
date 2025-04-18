const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Session } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  console.log("tokenExtractor");
  console.log(authorization);

  if (authorization && authorization.startsWith("Bearer ")) {
    req.decodedToken = jwt.verify(
      authorization.substring(7),
      process.env.SECRET,
    );
    if (req.decodedToken.id) {
      req.user = await User.findByPk(req.decodedToken.id);
    }
  } else {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const validSession = await Session.findOne({
    where: { token: authorization.substring(7) },
  });

  if (!validSession) {
    return res.status(401).json({ error: "no valid session" });
  }

  next();
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  console.log("ErrorHandler");
  console.log(typeof req);
  console.log(error);

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token missing or invalid" });
  } else if (error.name === "SequelizeValidationError") {
    const message = error.errors[0].message;
    return res.status(400).json({ error: message });
  } else {
    return res.status(400).json({ error: "Request failed" });
  }
};

module.exports = { tokenExtractor, errorHandler };
