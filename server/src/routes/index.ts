import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ChatGroupController from "../controllers/ChatGroupController.js";
import authMiddlware from "../middleware/AuthMiddleware.js";
const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/chat-group', authMiddlware, ChatGroupController.store);
router.get('/chat-group', authMiddlware, ChatGroupController.index);
router.get('/chat-group/:id', authMiddlware, ChatGroupController.show);
router.put('/chat-group/:id', authMiddlware, ChatGroupController.update);
router.delete('/chat-group/:id', authMiddlware, ChatGroupController.destroy);

export default router;
