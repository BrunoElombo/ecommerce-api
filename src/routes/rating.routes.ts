import { Router } from "express";
import { CreateRatingController, DeleteRatingController, GetAllRatingsController, GetRatingByproductIdController, UpdateRatingController } from "../controllers/rating.controller";
import { CreateRatingValidation } from "../validations/rating.validations";

const route = Router();

route.get('/', GetAllRatingsController)
route.post('/', CreateRatingValidation, CreateRatingController)
route.get('/:productId', GetRatingByproductIdController)
route.patch('/:id', UpdateRatingController)
route.delete('/:id', DeleteRatingController)

export default route;