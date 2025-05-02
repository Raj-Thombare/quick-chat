import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
import authMiddlware from "../middleware/AuthMiddleware.js";
import ChatGroupUserController from "../controllers/ChatGroupUserController.js";
import ChatsController from "../controllers/ChatsController.js";
const router = Router();

//Auth Routes
router.post('/auth/login', AuthController.login);

//Chat Group Routes
router.post('/chat-group', authMiddlware, ChatGroupController.store);
router.get('/chat-group', authMiddlware, ChatGroupController.index);
router.get('/chat-group/:id', ChatGroupController.show);
router.put('/chat-group/:id', authMiddlware, ChatGroupController.update);
router.delete('/chat-group/:id', authMiddlware, ChatGroupController.destroy);

//Chat Group User Routes
router.get('/chat-group-users', ChatGroupUserController.index);
router.post('/chat-group-users', ChatGroupUserController.store);

//Chat Messages 
router.get('/chats/:groupId', ChatsController.index);
router.post('/chats', ChatsController.store);

export default router;
