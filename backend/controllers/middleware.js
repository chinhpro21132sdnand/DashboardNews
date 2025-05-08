const jwt = require("jsonwebtoken");
const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    console.log(token, "token");
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Token is not valid" });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ message: "Token is not provided" });
    }
  },
  verifytokenandAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (
        req.user.role === "admin" ||
        req.user.role === "manage" ||
        req.user.id === req.params.id
      ) {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "You are not authorized to access this route" });
      }
    });
  },
};

module.exports = middlewareController;
