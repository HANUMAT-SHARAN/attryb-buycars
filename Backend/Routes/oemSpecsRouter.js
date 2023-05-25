const express = require("express");
const { oemSpecsModel } = require("../Models/oemSpecsModel.js");

const oemSpecsRouter = express.Router();
const dummyData = [
  {
    nameOfModel: "Honda Civic",
    yearOfModel: "2022",
    newPriceOfVehicle: 25000,
    colors: ["red", "black", "blue", "green"],
    mileage: 10000,
    power: 200,
    maxSpeed: 180,
    img: "https://images.hindustantimes.com/auto/img/2022/07/21/600x338/Honda_Civic_Type_R_front_1658400873335_1658401151735_1658401151735.jpeg",
  },
  {
    nameOfModel: "Toyota Camry",
    yearOfModel: "2023",
    newPriceOfVehicle: 30000,
    colors: ["yellow", "silver", "orange", "purple"],
    mileage: 5000,
    power: 220,
    maxSpeed: 200,
    img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Camry/8733/1677916969153/front-left-side-47.jpg?impolicy=resize&imwidth=420",
  },
  {
    nameOfModel: "Ford Mustang",
    yearOfModel: "2021",
    newPriceOfVehicle: 20000,
    colors: ["gray", "pink", "brown", "white"],
    mileage: 8000,
    power: 180,
    maxSpeed: 170,
    img: "https://imgd.aeplcdn.com/1056x594/cw/ec/23766/Ford-Mustang-Exterior-126883.jpg?wm=1&q=75",
  },
  {
    nameOfModel: "Chevrolet Corvette",
    yearOfModel: "2023",
    newPriceOfVehicle: 35000,
    colors: ["cyan", "magenta", "olive", "teal"],
    mileage: 3000,
    power: 250,
    maxSpeed: 210,
    img: "https://hips.hearstapps.com/hmg-prod/images/2020-chevrolet-corvette-lead-1571164761.jpg",
  },
  {
    nameOfModel: "Nissan Altima",
    yearOfModel: "2022",
    newPriceOfVehicle: 27000,
    colors: ["maroon", "beige", "darkblue", "lime"],
    mileage: 12000,
    power: 190,
    maxSpeed: 185,
    img: "https://media.ed.edmunds-media.com/nissan/altima/2020/oem/2020_nissan_altima_sedan_25-platinum_fq_oem_1_1600.jpg",
  },
  {
    nameOfModel: "BMW 3 Series",
    yearOfModel: "2023",
    newPriceOfVehicle: 40000,
    colors: ["lightgray", "gold", "skyblue", "navy"],
    mileage: 4000,
    power: 240,
    maxSpeed: 195,
    img: "https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/37067/3-series-exterior-front-view-4.jpeg?q=75",
  },
  {
    nameOfModel: "Mercedes-Benz C-Class",
    yearOfModel: "2021",
    newPriceOfVehicle: 35000,
    colors: ["darkgreen", "ivory", "turquoise", "salmon"],
    mileage: 7000,
    power: 210,
    maxSpeed: 175,
    img: "https://static.autox.com/uploads/2022/05/2022-Mercedes-Benz-C-Class-Front-Static.jpg",
  },
  {
    nameOfModel: "Audi A4",
    yearOfModel: "2023",
    newPriceOfVehicle: 38000,
    colors: ["lavender", "tan", "coral", "olivedrab"],
    mileage: 2500,
    power: 230,
    maxSpeed: 205,
    img: "https://imgd.aeplcdn.com/1056x594/n/p070ota_1501215.jpg?q=75",
  },
  {
    nameOfModel: "Lexus ES",
    yearOfModel: "2022",
    newPriceOfVehicle: 32000,
    colors: ["slategray", "khaki", "crimson", "mediumaquamarine"],
    mileage: 9000,
    power: 200,
    maxSpeed: 180,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdJ0hB8YrRrBtiGe76wF6abyrtPuiz7Z_l7UQksio-sHIHswX-",
  },
  {
    nameOfModel: "Volkswagen Passat",
    yearOfModel: "2023",
    newPriceOfVehicle: 28000,
    colors: ["darkorchid", "wheat", "tomato", "mediumseagreen"],
    mileage: 3500,
    power: 170,
    maxSpeed: 160,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/VW_Passat_B8_Limousine_2.0_TDI_Highline.JPG/1200px-VW_Passat_B8_Limousine_2.0_TDI_Highline.JPG",
  },
  // Add more dummy data objects as needed
];

oemSpecsRouter.get("/getspecs", async (req, res) => {
  const { search } = req.query;
  try {
    if (search) {
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
