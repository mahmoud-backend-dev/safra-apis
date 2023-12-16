import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
import 'express-async-errors';
import 'dotenv/config.js';
import express, { json, urlencoded, static as static_ } from 'express';
const app = express();
const port = process.env.PORT || 1812;


// Setting Security For App
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';


import mountRoutes from './routes/index.js';

// Setup Swaggger UI
// import { serve, setup } from 'swagger-ui-express';
// import { load } from 'yamljs';
// const swaggerDocument = load('./swagger.yaml');

import errorHandler from './middleware/error-handler.js';
import notFoundErr from './middleware/notFoundMiddleware.js';
import connectDB from './db/connectDB.js';


// Trust the 'X-Forwarded-For' header when behind a proxy
app.set('trust proxy', 'loopback');


// Enable other domains to access your application
app.use(cors());
app.options('*', cors());

// Compress all responses
app.use(compression());

// for Swagger Ui StartUp an running live server
// app.get('/', (req, res) => res.redirect('/api-docs'));
// app.use('/api-docs', serve, setup(swaggerDocument));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(static_(path.join(__dirname, 'uploads')));

// To remove data using these defaults, To apply data sanitization
// nosql mongo injection
app.use(mongoSanitize());



// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 10000,
    message:
        'Too many accounts created from this IP, please try again after an 15 minutes'
})

// Apply the rate limiting middleware to all requests
app.use(limiter)


// Express middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp())


// Mounts Routes
mountRoutes(app);

app.use(errorHandler);
app.use(notFoundErr);

const start = async () => {
    try {
        await connectDB(process.env.URI);
        app.listen(port, () => console.log(`Listen server on http://localhost:${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();