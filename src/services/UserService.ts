import UserModel from '../Models/UserModel';
import * as UserRepository from '../Repositories/UserRepository';
import * as HttpResponse from '../utils/http-helper';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new Error('A senha não pode estar vazia.');
  }
  return await bcrypt.hash(password, 10);
};

export const createRegisterService = async (user: UserModel) => {
  let response = null;
  if (Object.keys(user).length === 0) {
    return await HttpResponse.badRequest(new Error('Insira os dados corretamente e tente novamente'));
  }

  try {
    user.password = await hashPassword(user.password);
    await UserRepository.createRegister(user);
    response = HttpResponse.created('Usuário cadastrado com sucesso');
  } catch (error) {
    response = await HttpResponse.badRequest(error);
  }

  return response;
};

export const getAllUsersService = async () => {
  const data = await UserRepository.getAllUsers();
  let response = null;
  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const authenticateUserService = async (user: UserModel) => {
  let response = null;
  const token = jwt.sign({ user }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  if (Object.keys(user).length === 0) {
    return await HttpResponse.badRequest(new Error('Insira os dados corretamente e tente novamente'));
  }

  try {
    await UserRepository.authenticateUser(user);
    response = HttpResponse.ok({
      message: 'Login realizado com sucesso',
      token: token,
    });
  } catch (error) {
    response = await HttpResponse.badRequest(error);
  }
  return response;
};
