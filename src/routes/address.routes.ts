import { Router, RequestHandler } from "express";
import { createAddressController, deleteOwnAddressController, getAllOwnAddressController, updateOwnAddressController } from "../controllers/address.controller";
import { createAddressValidation, updateAddressValidation } from "../validations/address.validations";

const routes = Router();


routes.get("/", getAllOwnAddressController as RequestHandler);
routes.post("/", createAddressValidation, createAddressController as RequestHandler);
routes.patch("/:id", updateAddressValidation, updateOwnAddressController as RequestHandler);
routes.delete("/:id", deleteOwnAddressController as RequestHandler);


export default routes;