
import { type Request, type Response } from 'express';
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.helper";
import { createUserTokens } from '../common/services/passport-jwt.services';
import { type IUser } from "./user.dto";
import { AuthenticatedRequest } from './auth.middleware';
import * as userService from "./user.service";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    const { password, ...user } = result;
    res.send(createResponse(user, "User created sucssefully"))
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.editUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.deleteUser(req.params.id);
    res.send(createResponse(result, "User deleted sucssefully"))
});


export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.id);
    res.send(createResponse(result))
});


export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.send(createResponse(result))
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as Omit<IUser, "password">;
    const tokens = createUserTokens(user);
    res.send(createResponse(tokens))
});


export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req.user as any)?._id;
    const user = await userService.getUserById(userId);
    res.send(createResponse(user))
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    // To do: Remove session
    res.send(createResponse({}))
});

// export const uploadPdf = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//   try {
//     const file = req.file;
//     const userId = req.auth?.id;

//     if (!file || !userId) {
//       res.status(400).json({ success: false, message: 'File or user ID missing' });
//       return;
//     }

//     if (file.mimetype !== 'application/pdf') {
//       res.status(400).json({ success: false, message: 'Only PDF files are allowed' });
//       return;
//     }

//     const cloudinaryUrl = await uploadPdfToCloudinary(file.buffer, userId);
//     const updatedUser = await addPdfUrlToUser(userId, cloudinaryUrl);

//     if (!updatedUser) {
//       res.status(404).json({ success: false, message: 'User not found' });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: 'PDF uploaded successfully',
//       data: updatedUser,
//     });
//   } catch (error: any) {
//     console.error('Upload error:', error);
//     res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
//   }
// };