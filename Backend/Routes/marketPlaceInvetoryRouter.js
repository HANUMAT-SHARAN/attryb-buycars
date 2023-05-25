const express = require("express");
const { InventoryModel } = require("../Models/inventoryModel.js");
const { oemSpecsModel } = require("../Models/oemSpecsModel.js");

const invetoryRouter = express.Router();
const d = [
  {
    km: 10000,
    majorScratches: "Yes",
    price: 12000,
    orginalPaint: "No",
    accidents: 2,
    prevBuyers: 2,
    registrationPlace: "California",
    oemId: "646f51a31b3dacd02bece0ad",
  },
  {
    km: 8000,
    majorScratches: "No",
    price: 18000,
    orginalPaint: "Yes",
    accidents: 0,
    prevBuyers: 1,
    registrationPlace: "Texas",
    oemId: "646f51a31b3dacd02bece0b1",
  },
  {
    km: 6000,
    majorScratches: "No",
    price: 15000,
    orginalPaint: "Yes",
    accidents: 1,
    prevBuyers: 3,
    registrationPlace: "Florida",
    oemId: "646f51a31b3dacd02bece0aa",
  },
];

invetoryRouter.post("/inventory", async (req, res) => {
  try {
    await InventoryModel.insertMany([
      {
        km: 10000,
        majorScratches: "Yes",
        price: 12000,
        orginalPaint: "No",
        accidents: 2,
        prevBuyers: 2,
        registrationPlace: "California",
        oemId: "646f51a31b3dacd02bece0ad",
      },
      {
        km: 8000,
        majorScratches: "No",
        price: 18000,
        orginalPaint: "Yes",
        accidents: 0,
        prevBuyers: 1,
        registrationPlace: "Texas",
        oemId: "646f51a31b3dacd02bece0b1",
      },
      {
        km: 6000,
        majorScratches: "No",
        price: 15000,
        orginalPaint: "Yes",
        accidents: 1,
        prevBuyers: 3,
        registrationPlace: "Florida",
        oemId: "646f51a31b3dacd02bece0aa",
      },
    ]);
    res.status(200).send({ msg: "done" });
  } catch (error) {
    res.send({ error });
  }
});

invetoryRouter.get("/inventory", async (req, res) => {
  // const search="Honda"
  const { order, filter, search } = req.query;
  try {
    if (filter === "price") {
      let deals = await InventoryModel.find({})

        .populate("oemId")
        .lean();

      deals.sort((a, b) => b.oemId.price - a.oemId.price);

      res.status(200).send({ deals });
    } else if (filter == "mileage") {
      let deals = await InventoryModel.find({}).populate("oemId").lean();

      deals.sort((a, b) => b.oemId.mileage - a.oemId.mileage);

      res.status(200).send({ deals });
    } else if (filter === "colors") {
      let deals = await InventoryModel.find({}).populate({
        path: "oemId",
        match: { colors: { $regex: order, $options: "i" } },
      });

      deals = deals.filter((deal) => deal.oemId !== null);

      res.status(200).send({ deals });
    } else {
      let deals = await InventoryModel.find({}).populate({
        path: "oemId",
      });

      res.status(200).send({ deals });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//particular user deals

invetoryRouter.get("/inventory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let deals = await InventoryModel.find({ userId: id });
    res.status(200).send({ deals });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//update particulart inventory

invetoryRouter.patch("/inventory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await InventoryModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({ msg: "Updated Deal Success" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//update delete particular deal

invetoryRouter.delete("/inventory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await InventoryModel.findOneAndDelete(id);
    res.status(200).send({ msg: "Deleted Deal Success" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = { invetoryRouter };
