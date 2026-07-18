import { Router } from "express";

import {
  getProgressRecords,
  getProgressById
} from "./reposteHours-controller.js";

import {
  validateProgressId
} from "../../middlewares/reposteHours-validation.js";

const router = Router();

router.get('/', getProgressRecords);

router.get(
  '/:id',
  validateProgressId,
  getProgressById
);

export default router;
