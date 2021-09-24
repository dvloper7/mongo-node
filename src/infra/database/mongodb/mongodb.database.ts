import IDatabase from "../database.interface";
import mongoose from "mongoose";
import mongodbConfig from "../config/mongodb.config";

export default class MongoDBDatabase implements IDatabase {
  constructor() {}

  connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(mongodbConfig.uri, {
          dbName: mongodbConfig.dbName,
          connectTimeoutMS: mongodbConfig.connectTimeoutMS,
          maxPoolSize: mongodbConfig.maxPoolSize,
        })
        .then(
          (conn) => resolve(true),
          (err) => reject(err)
        );
    });
  }
}
