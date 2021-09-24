import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import Database from "./infra/database/database";
import MongoDBDatabase from "./infra/database/mongodb/mongodb.database";
import UserRoutes from "./routes/user.route";
import cors from "cors";
import KeycloakService from "./application/services/keycloak.service";
import KeycloakConnectAdapter from "./infra/auth/keycloak/keycloak-connect.adapter";
import session from "express-session";

const app = express();

class App {
  private db!: Database;
  private memoryStore = new session.MemoryStore();

  constructor(private app: Application) {
    this.adapters();
    this.database();
    this.middlewares();
    this.publicRoutes();
  }

  private adapters() {
    // Define o adaptador a ser utilizado para integrar com o Keycloak
    KeycloakService.adapter(new KeycloakConnectAdapter());
    KeycloakService.init(this.memoryStore);
  }

  private database() {
    this.db = new Database(new MongoDBDatabase());
    this.db.connect();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  private publicRoutes() {
    this.app.use(KeycloakService.getKeycloak().protect(), UserRoutes);
  }

  listen() {
    this.app.listen(3001, () => {
      console.log("Listening at the port ", 3001);
    });
  }
}

new App(app).listen();
