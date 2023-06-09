const express = require("express");
const { oemSpecsModel } = require("../Models/oemSpecsModel.js");

const oemSpecsRouter = express.Router();

//this route is used to search the specifications of oem model and give documents on the baseis of dynmacillay
//search query

oemSpecsRouter.get("/getspecs", async (req, res) => {
  const { search } = req.query;
  try {
    if (search) {
      //this query will find the documents which will match the patiucular regex query by options i for
      //case senstive searching like Hanumat HANUMAT both will give results same
      // if search queyr matches with any of the nameofModel yearModel and colors it weill return data
      let specs = await oemSpecsModel.find({
        $or: [
          { nameOfModel: { $regex: search, $options: "i" } },
          { yearOfModel: { $regex: search, $options: "i" } },
          { colors: { $regex: search, $options: "i" } },
        ],
      });
      res.status(200).send({ specs });
    } else {
      let specs = await oemSpecsModel.find({});
      res.send({ specs });
    }
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { oemSpecsRouter };
