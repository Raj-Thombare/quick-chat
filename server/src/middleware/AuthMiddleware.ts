import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const authMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader == null || authHeader == undefined) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        req.user = user;
        next();
    })
}

export default authMiddlware;