import { CreateAddressController, DeleteAddressController, GetAddressByIdController, GetAllAddressesController, UpdateAddressController } from '../controllers/address.controller';
import { CreateAddressValidation } from '../validations/address.validations';
import { Router } from "express";

const route = Router();

route.get('/', GetAllAddressesController)
route.post('/', CreateAddressValidation, CreateAddressController)
route.get('/:id', GetAddressByIdController)
route.patch('/:id', UpdateAddressController)
route.delete('/:id', DeleteAddressController)

export default route;