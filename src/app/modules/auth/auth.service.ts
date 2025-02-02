import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import config from '../../config';
import { createToken } from './auth.utils';

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: ILoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('This user is not found !');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //create token and sent to the client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken, user };
};

export const AuthService = {
  register,
  login,
};
