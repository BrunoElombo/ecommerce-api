import cookieParser  from 'cookie-parser';
import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';

import ProductRoutes from "./routes/product.routes";
import CategoryRoutes from './routes/category.routes';
import CartItemRoutes from './routes/cartItem.routes';
import ProductCategories from './routes/productCategories.routes';
import ProductVariations from './routes/productVariations.routes';
import AddressRoutes from './routes/address.routes';
import PaymentRoutes from './routes/payment.routes';
import ReviewRoutes from './routes/review.routes';
import RatingRoutes from './routes/rating.routes';

const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your secret key


import HTTP_STATUS from './utils/http.utils';

// Middlewares
dotenv.config();
const app:Application = express();
app.use(cors());
app.use(helmet())
app.use(morgan("combined"));
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/addresses", AddressRoutes);
app.use("/api/v1/categories", CategoryRoutes);
app.use("/api/v1/product-categories", ProductCategories);
app.use("/api/v1/product-variations", ProductVariations);
app.use("/api/v1/payments", PaymentRoutes);
app.use("/api/v1/reviews", ReviewRoutes);
app.use("/api/v1/ratings", RatingRoutes);
app.use("/api/v1/cart-items", CartItemRoutes);


export default app;
