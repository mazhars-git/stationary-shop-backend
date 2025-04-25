import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser) => {
  payload.role = payload.role || 'user';
  const result = await User.create(payload);

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  
  return result;
};

// Get All users
const getAllUser = async () => {
  const result = await User.find();
  return result;
};


export const UserService = {
  createUser,
  getSingleUserFromDB,
  getAllUser,
};
