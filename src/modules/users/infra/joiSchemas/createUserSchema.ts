import Joi from 'joi';

const createUserSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('ADMIN', 'TECHNICIAN'),
    area: Joi.boolean(),
  })
  .required();

export default createUserSchema;
