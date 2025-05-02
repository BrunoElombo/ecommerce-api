import cookieParser  from 'cookie-parser';
import express, {Application, Response, Request} from 'express';
import { ENTERPRISE_API, BILLING_API, BUDGET_API } from './config';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';


// Routes imports
import userRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes'


dotenv.config();
const app:Application = express();
app.use(cors());
app.use(helmet())
app.use(morgan("combined"));
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(rateLimitAndTimeout as RequestHandler);


// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);


export default app;
