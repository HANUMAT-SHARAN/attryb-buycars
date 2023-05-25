const jswt = require("jsonwebtoken");

const userRelationShip = (req, res, next) => {
  const  token  = req.headers.authorization;

  try {
    jswt.verify(token, "hanumat", (error, decoded) => {
      if (decoded) {
        req.body.userId = decoded.id;
        next();
      } else if (error) {
        res.status(400).send({ msg: error });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
module.exports = { userRelationShip };
