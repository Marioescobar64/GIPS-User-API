import { Router } from "express";

import {
  getReviews,
  getReviewById
} from "./review-controller.js";

import {
  validateReviewId
} from "../../middlewares/review-validation.js";

const router = Router();

router.get('/', getReviews);

router.get(
  '/:id',
  validateReviewId,
  getReviewById
);

export default router;
