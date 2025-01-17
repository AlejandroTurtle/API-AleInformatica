import UserModel from '../Models/UserModel';
import User from '../Models/UserModel';
import bcrypt from 'bcryptjs';

export const createRegister = async (userData: Omit<UserModel, 'id'>) => {
  try {
    const existingUser = await User.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error(`Já existe um usuário cadastrado com esse email ${userData.email}`);
    }

    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (): Promise<UserModel[]> => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email'],
  });
  return users;
};

export const authenticateUser = async (userData: UserModel): Promise<UserModel> => {
  try {
    const user = await User.findOne({
      where: { email: userData.email },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(userData.password, user.password);

    if (!passwordMatch) {
      throw new Error('Senha incorreta');
    }

    // Remove a senha antes de retornar
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;

    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};
