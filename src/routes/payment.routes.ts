import { CreatePaymentController, DeletePaymentController, GetAllPaymentsController, GetPaymentByIdController, UpdatePaymentController } from '../controllers/payment.controller';
import { Router } from "express";
import { CreatePaymentValidation } from '../validations/payment.validations';

const route = Router();

route.get('/', GetAllPaymentsController)
route.post('/', CreatePaymentValidation, CreatePaymentController)
route.get('/:id', GetPaymentByIdController)
route.patch('/:id', UpdatePaymentController)
route.delete('/:id', DeletePaymentController)

export default route;