import { Router } from "express";

import {
  getPractices,
  getPracticeById
} from "./practice-controller.js";

import {
  validatePracticeId
} from "../../middlewares/practice-validation.js";

const router = Router();

router.get('/', getPractices);

router.get(
  '/:id',
  validatePracticeId,
  getPracticeById
);

export default router;
