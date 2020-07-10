import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import { sequelize } from "./sequelize";
import Controller from "./interfaces/controller";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.connectToDataBase();
    this.initMiddlewares();
    this.initControllers(controllers);
  }

  public listen() {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on PORT ${process.env.PORT}`);
    });
  }

  private connectToDataBase() {
    sequelize.sync();
  }

  private initMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json({ limit: "5mb" }));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Expose-Headers", "x-total-count");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
      res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
      next();
    });
  }

  private initControllers(controllers: Controller[]) {
    const prefix = process.env.PREFIX || "/";
    controllers.forEach((controller) => {
      this.app.use(prefix, controller.router);
    });
  }
}

export default App;
