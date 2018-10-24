import { Request, Response, NextFunction } from "express";

export class ApiController {
  public getData(req: Request, res: Response, next: NextFunction): any {
    return res.status(200).json("data");
  }
  public isAuthenticated(req: Request, res: Response, next: NextFunction): any {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({
        message: "Unauthenticated"
      });
    }
  }
}