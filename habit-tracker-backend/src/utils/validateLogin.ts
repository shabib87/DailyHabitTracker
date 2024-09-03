import Joi from 'joi';
import { UserLoginDTO } from '../dto/user.dto';

export function validateLogin(data: UserLoginDTO) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
}
