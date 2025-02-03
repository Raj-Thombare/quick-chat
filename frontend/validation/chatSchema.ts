import { z } from 'zod';

export const createChatSchema = z.object({
    title: z.string().min(4, { message: "Chat title must be 4 characters long" }).max(191, { message: "Title must be less than 191 characters" }),
    passcode: z.string().min(4, { message: "Chat title must be 4 characters long" }).max(25, { message: "Chat passcode must be less than 25 characters" })
})

export type createChatSchemaType = z.infer<typeof createChatSchema>;