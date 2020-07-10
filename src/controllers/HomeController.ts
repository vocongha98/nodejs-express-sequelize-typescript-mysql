import User from "../models/User";
import { Router, Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import Controller from "../interfaces/controller";

class HomeController implements Controller {
  public path = "/home";
  public router = Router();

  constructor() {
    this.initRouter();
  }

  private initRouter() {
    this.router.get(`${this.path}`, asyncHandler(this.index));
    this.router.post(`${this.path}`, asyncHandler(this.create));
  }

  private index = (req: Request, res: Response) => {
    res.jsonp({
      success: true,
      message: null,
      data: "Haha Hà Võ!",
    });
  };

  private create = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.jsonp({
        success: true,
        message: null,
        data: user,
      });
    } catch (error) {
      res.jsonp({
        success: false,
        message: error.message,
        data: null,
      });
    }
  };
}

export default HomeController;
