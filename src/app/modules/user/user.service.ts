import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: IUser): Promise<IUser> => {
  // Set the default role to 'user' if not provided
  payload.role = payload.role || 'user';
  const result = await User.create(payload)

  return result
}

const getMe = async (userId: string) => {
  const result = await User.findById(userId);
  // console.log(result);

  return result;
};

// Get All users
const getAllUser = async () => {
  const result = await User.find()
  return result
}

// // Get single users
// const getSingleUser = async (id: string) => {
//   //   const result = await User.findOne({name:"habi jabi"})
//   const result = await User.findById(id)
//   return result
// }

// const updateUser = async (id: string, data: IUser) => {
//   const result = await User.findByIdAndUpdate(id, data, {
//     new: true, // return the updated document
//   })
//   return result
// }

// const deleteUser = async (id: string) => {
//   const result = await User.findByIdAndDelete(id)
//   return result
// }

export const userService = {
  createUser,
  getMe,
  getAllUser,
}
