require("dotenv").config();

export default {
  uri: process.env.MONGO_URI!,
  dbName: process.env.MONGO_DBNAME!,
  maxPoolSize: 10,
  connectTimeoutMS: 30000,
  auth: undefined,
};
