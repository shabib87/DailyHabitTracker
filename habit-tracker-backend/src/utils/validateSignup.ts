import Joi from 'joi';
import { UserDTO } from '../dto/user.dto';

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

export const validateSignup = (data: UserDTO) => {
  return signupSchema.validate(data);
};
