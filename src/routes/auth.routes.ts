import { Router, Request, Response, RequestHandler } from "express";
import { registerUserController, loginUserController, logoutController, forgotPasswordController, newPasswordController, refreshTokenController } from "../controllers/auth.controller";
import { forgotPasswordValidation, loginValidation, registrationValidation } from "../validations/auth.validations";

const routes = Router();

routes.post('/register', registrationValidation, registerUserController as RequestHandler);
routes.post('/login', loginValidation, loginUserController as RequestHandler);
routes.post('/logout', logoutController as RequestHandler);
routes.post('/forgot-password', forgotPasswordValidation, forgotPasswordController as RequestHandler);
routes.post('/reset-password', newPasswordController as RequestHandler);
routes.post('/refresh-token', refreshTokenController as RequestHandler);

export default routes;