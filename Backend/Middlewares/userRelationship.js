const jswt = require("jsonwebtoken");

const userRelationShip = (req, res, next) => {
  const  token  = req.headers.authorization;
  //this token is used for relationship management so we are decoding the token come from the fronted authorization
  // and after that passing into req.body.userId 

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
