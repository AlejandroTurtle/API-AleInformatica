import { Request, Response } from 'express';

import * as UserService from '../services/UserService';
import UserModel from '../Models/UserModel';

export const createRegister = async (req: Request, res: Response) => {
  const bodyValue: UserModel = req.body;
  const HttpResponse = await UserService.createRegisterService(bodyValue);
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const getUsers = async (req: Request, res: Response) => {
  const HttpResponse = await UserService.getAllUsersService();
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};

export const authenticateUser = async (req: Request, res: Response) => {
  const bodyValue: UserModel = req.body;
  const HttpResponse = await UserService.authenticateUserService(bodyValue);
  res.status(HttpResponse.statusCode).json(HttpResponse.body);
};
