import { Router } from "express";
import { CreateCartItemController, DeleteCartItemController, GetAllCartItemsController, GetCartItemByIdController, GetCartItemsBySKUController, UpdateCartItemController } from "../controllers/cartItem.controller";
import { CreateCartItemValidation } from "../validations/cartItem.validations";

const route = Router();

route.get('/', GetAllCartItemsController)
route.post('/', CreateCartItemValidation, CreateCartItemController)
route.get('/:id', GetCartItemByIdController)
route.get('/:id/sku', GetCartItemsBySKUController)
route.patch('/:id', UpdateCartItemController)
route.delete('/:id', DeleteCartItemController)

export default route;