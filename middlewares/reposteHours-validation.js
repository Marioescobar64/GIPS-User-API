import { param } from "express-validator";
import { checkValidators } from "./check-validation.js";

export const validateProgressId = [
  param('id')
    .isMongoId()
    .withMessage('El ID debe ser un ObjectId válido'),
  checkValidators
];
