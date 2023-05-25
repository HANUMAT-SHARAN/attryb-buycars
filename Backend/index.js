const express = require("express");
const { dataBaseConnection } = require("./Configs/dataBase.js");
require("dotenv").config();

const app = express();

app.listen(process.env.PORT, async () => {
  try {
    console.log(`Server is Started at  ${process.env.PORT}`);

    await dataBaseConnection;

    console.log("Data Base Is Connected to Server");
  } catch (error) {
    console.log(error);
  }
});
