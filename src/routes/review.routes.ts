import { Router } from "express";
import { ApproveReviewController, CreateReviewController, DeleteReviewController, GetAllReviewsController, GetReviewByproductIdController, RejectReviewController, UpdateReviewController } from "../controllers/review.controller";
import { CreateReviewValidation } from "../validations/review.validation";

const route = Router();

route.get('/', GetAllReviewsController)
route.post('/', CreateReviewValidation, CreateReviewController)
route.get('/:productId', GetReviewByproductIdController)
route.patch('/:id', UpdateReviewController)
route.patch('/:id/reject', RejectReviewController)
route.patch('/:id/approve', ApproveReviewController)
route.delete('/:id', DeleteReviewController)

export default route;