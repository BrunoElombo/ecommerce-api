import { CreatePaymentController, DeletePaymentController, GetAllPaymentsController, GetPaymentByIdController, UpdatePaymentController, CreateStripeCheckoutSessionController } from '../controllers/payment.controller';
import { Router } from "express";
import { CreatePaymentValidation } from '../validations/payment.validations';
import { verifyToken } from '../middleware/auth.middleware';

const route = Router();

route.get('/', GetAllPaymentsController)
route.post('/', CreatePaymentValidation, CreatePaymentController)
route.get('/:id', GetPaymentByIdController)
route.patch('/:id', UpdatePaymentController)
route.delete('/:id', DeletePaymentController)
route.post('/checkout-session', CreateStripeCheckoutSessionController)
// route.get('/me', verifyToken, GetMeController)

export default route;