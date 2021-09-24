import IDatabase from "./database.interface";

export default class Database {
  constructor(private database: IDatabase) {}

  connect() {
    this.database.connect().then((r) => console.log("Database connected!"));
  }
}
