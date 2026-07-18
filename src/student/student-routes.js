import { Router } from "express";

import {
  getStudentRecords,
  getStudentById
} from "./student-controller.js";

import {
  validateStudentId
} from "../../middlewares/student-validation.js";

const router = Router();

router.get('/', getStudentRecords);

router.get(
  '/:id',
  validateStudentId,
  getStudentById
);

export default router;
