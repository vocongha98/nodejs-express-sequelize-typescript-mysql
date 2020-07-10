import App from "./app";
import HomeController from "./controllers/HomeController";

const app = new App([new HomeController()]);

app.listen();
