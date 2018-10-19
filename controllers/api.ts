import { Request, Response, NextFunction } from "express";

export class ApiController {
  public getData(req: Request, res: Response, next: NextFunction): any {
    return res.status(200).json("data");
  }
}