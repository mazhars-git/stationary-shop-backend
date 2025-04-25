import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const userRouter = Router();

userRouter.post(
  '/user/create-user',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);

userRouter.get(
  '/user/:userId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getSingleUser,
);

userRouter.get(
  '/user',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getAllUser,
);

userRouter.get(
  '/user/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getCurrentUser 
);

export const UserRoutes = userRouter;
