import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import config from '../../config';
import { createToken, verifyToken } from './auth.utils';

const register = async (payload: IUser) => {
  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Create a new user
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
    userId: user._id,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken,
    refreshToken, };
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  const { email } = decoded;

  const user = await User.checkUserExistByEmailId(email);

  if (!user) {
    throw new AppError(404, 'This user is not found!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token: accessToken,
  };
};



export const AuthService = {
  register,
  login,
  refreshToken
};
