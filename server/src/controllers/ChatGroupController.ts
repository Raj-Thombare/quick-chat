import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {

    static async index(req: Request, res: Response) {
        try {
            const user = req.user;

            const groups = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.id
                },
                orderBy: {
                    created_at: "desc"
                }
            })

            return res.json({
                data: groups
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Something went wrong! Please try again later."
            })
        }
    }

    static async show(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (id) {
                const group = await prisma.chatGroup.findUnique({
                    where: {
                        id: id
                    }
                })

                return res.json({ data: group })
            }

            return res.status(404).json({ message: "No groups found" });

        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong! Please try again later."
            })
        }
    }

    static async store(req: Request, res: Response) {
        try {
            const body = req.body;
            const user = req.user;

            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id
                }
            })

            return res.status(201).json({
                message: "Chat Group created successfully!"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Something went wrong! Please try again later."
            })
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const body = req.body;
            const { id } = req.params;

            await prisma.chatGroup.update({
                where: {
                    id: id
                },
                data: {
                    title: body.title,
                    passcode: body.passcode
                }
            })

            return res.status(201).json({
                message: "Chat Group updated successfully!"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Something went wrong! Please try again later."
            })
        }
    }

    static async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await prisma.chatGroup.delete({
                where: {
                    id: id
                }
            })

            return res.status(201).json({
                message: "Chat Group deleted successfully!"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Something went wrong! Please try again later."
            })
        }
    }
}

export default ChatGroupController;