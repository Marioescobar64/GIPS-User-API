import { Router } from "express";

import {
  getDocuments,
  getDocumentById
} from "./evidence-controller.js";

import {
  validateDocumentId
} from "../../middlewares/evidence-validation.js";

const router = Router();

router.get('/', getDocuments);

router.get(
  '/:id',
  validateDocumentId,
  getDocumentById
);

export default router;
