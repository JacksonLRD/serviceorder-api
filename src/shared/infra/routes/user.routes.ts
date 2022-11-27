import { Router } from 'express';
import UserController from '../../../modules/users/controllers/UserController';

const userRouter = Router();

// userRouter.post('/login', UserController.create);
userRouter.post('/', UserController.create);

export default userRouter;
