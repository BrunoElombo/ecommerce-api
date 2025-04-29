import { Router } from "express";
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUsersController } from "../controllers/user.controller";
import { createUserValidation, updateUserValidation } from "../validations/user.validations";
const router = Router();



router.get('', getAllUsersController);
router.get('/me', getAllUsersController);
router.get('/:id', getUserByIdController);
router.post('/',createUserValidation, createUserController);
router.patch('/:id',updateUserValidation, updateUsersController);
router.patch('/me',updateUserValidation, updateUsersController);
router.delete("/:id", deleteUserController);

export default router;