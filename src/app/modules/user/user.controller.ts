import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';

// Create a new user controller
const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UserService.createUser(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

// Get me by token controller
const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserService.getSingleUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

// Get all users controller
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserService.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All user fetched successfully',
    data: result,
  });
});

// // Get single user controller
// const getSingleUser = catchAsync(async (req, res) => {
// //   console.log(req.params);
//   const userId = req.params.userId;

//   const result = await UserService.getSingleUser(userId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User retrieved successfully',
//     data: result,
//   });
// });

// // Update user controller
// const updateUser = catchAsync(async (req, res) => {
//   const userId = req.params.userId;
//   const body = req.body;
//   const result = await UserService.updateUser(userId, body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User updated successfully',
//     data: result,
//   });
// });

// // Delete user controller
// const deleteUser = catchAsync(async (req, res) => {
//   const userId = req.params.userId;
//   await UserService.deleteUser(userId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User deleted successfully',
//     data: {},
//   });
// });

export const userController = {
  createUser,
  getSingleUser,
  getAllUser,
};
