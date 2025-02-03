import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const userRouter = Router();

userRouter.post(
  '/create-admin',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);

// userRouter.get('/:userId', userController.getSingleUser);
// userRouter.put('/:userId', userController.updateUser);
// userRouter.delete('/:userId', userController.deleteUser);
userRouter.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getMe,
);

userRouter.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getAllUser,
);

export const UserRoutes = userRouter;
