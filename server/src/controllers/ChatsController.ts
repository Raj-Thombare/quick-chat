import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatsController {

    static async index(req: Request, res: Response) {
        const { groupId } = req.params;

        const chats = await prisma.chats.findMany({
            where: {
                group_id: groupId
            }
        })

        return res.json({
            data: chats
        })
    }

    static async store(req: Request, res: Response) {
        const { chats, group_id } = req.body;

        if (!Array.isArray(chats) || !group_id) {
            return res.status(400).json({ error: "Invalid input" });
        }

        try {
            const savedChats = await prisma.chats.createMany({
                data: chats.map(chat => ({
                    id: chat.id,
                    message: chat.message,
                    name: chat.name,
                    created_at: new Date(chat.created_at),
                    group_id: group_id,
                })),
                skipDuplicates: true
            });

            return res.status(201).json({ data: savedChats });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }


}

export default ChatsController;