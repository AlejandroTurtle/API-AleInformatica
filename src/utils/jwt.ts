import jwt from 'jsonwebtoken';

export const generateToken = (payload: object, secret: string, expiresIn: string = '1h') => {
  return jwt.sign(payload, secret, { expiresIn });
};
