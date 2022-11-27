import { Router } from 'express';
import { authentication } from '../../../../../shared/infra/middlewares/authentication';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/login', UserController.authenticate);
userRouter.post('/', authentication, UserController.create);

export default userRouter;
