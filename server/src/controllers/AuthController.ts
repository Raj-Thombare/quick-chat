import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from 'jsonwebtoken';

interface LoginPayloadType {
    name: string;
    email: string;
    provider: string;
    image?: string;
    oauth_id: string;
}

class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const body: LoginPayloadType = req.body;

            let user = await prisma.user.findUnique({
                where: {
                    email: body.email
                }
            })

            if (!user) {
                user = await prisma.user.create({
                    data: body
                })
            }

            let JWTPayload = {
                name: body.name,
                email: body.email,
                id: user.id
            }

            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
                expiresIn: '365d'
            })

            return res.json({
                message: "Logged in successfully!",
                data: {
                    ...JWTPayload,
                    token: `Bearer ${token}`
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong. Please try again later!"
            })
        }
    }
}

export default AuthController;