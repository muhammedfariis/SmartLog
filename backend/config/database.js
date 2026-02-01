import mongoose from "mongoose";
import logger from "../log/logger.js";
const DataBase = async () => {
  try {
    logger.debug("database working");
    await mongoose.connect(process.env.MONGOURL);
    logger.debug("database connection working properly");
    console.log("MONGO_DB CONNECTED🍃");
  } catch (err) {
    console.log("MONGO_DB CONNECTION REFUSED🍂");
  }
};

export default DataBase;
