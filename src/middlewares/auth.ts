import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['Authorization'];
        if (token && token === process.env.SECRET_KEY) {
            next();
        } else {
            res.status(403).json({ message: "Unathorized" })
        }
    }
}
