import { Router } from "express";
import { CreateReviewController, DeleteReviewController, GetAllReviewsController, GetReviewByproductIdController, UpdateReviewController } from "../controllers/review.controller";
import { CreateReviewValidation } from "../validations/review.validation";

const route = Router();

route.get('/', GetAllReviewsController)
route.post('/', CreateReviewValidation, CreateReviewController)
route.get('/:productId', GetReviewByproductIdController)
route.patch('/:id', UpdateReviewController)
route.delete('/:id', DeleteReviewController)

export default route;