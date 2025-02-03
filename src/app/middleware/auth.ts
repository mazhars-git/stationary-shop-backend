import { httpStatus } from 'http-status';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import config from '../config';
import AppError from '../errors/AppError';


const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token);
    // checking if the token is missing
    if (!token) {
      throw new Error( 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;


    const { role, email} = decoded;

    // checking if the user is exist
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('This user is not found !')
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized  hi!',
    );
  }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;