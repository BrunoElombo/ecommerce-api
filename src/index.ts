import cookieParser  from 'cookie-parser';
import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';


// Routes imports
import userRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes'
import addressRoutes from './routes/address.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import productVariationRoutes from './routes/productVariation.routes'


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
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/address', addressRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/product-variations', productVariationRoutes);


export default app;
