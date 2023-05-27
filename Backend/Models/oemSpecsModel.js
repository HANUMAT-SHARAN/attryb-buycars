const mongoose = require("mongoose");


//this is the oem Specifications model Schema which states that all the keys of oem Specifications document will not more than 
//thsese given keys and of specific types mentioned also

const oemSpecsModelSchema = mongoose.Schema({
  nameOfModel: { required: true, type: String },
  yearOfModel: { required: true, type: String },
  newPriceOfVehicle: { required: true, type: Number },
  colors: { required: true, type: Array },
  mileage: { required: true, type: Number },
  power: { required: true, type: Number },
  maxSpeed: { required: true, type: Number },
  img:{required:true,type:String}
});

const oemSpecsModel = mongoose.model("oemspecs", oemSpecsModelSchema);

module.exports = { oemSpecsModel };
