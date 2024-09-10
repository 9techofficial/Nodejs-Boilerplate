import dotenv from 'dotenv';
import fastify from 'fastify';
import { routes } from './routes/routes';
import { connectDB } from './utilities/db';
import { logInfo } from './utilities/logger';

// Load the appropriate .env file based on NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${nodeEnv}` });

// implement fastify
const app = fastify({ logger: false });

// Load routes
routes(app);

(async () => {
  try {
    await connectDB();
    await app.listen({ port: Number(process.env.PORT) || 3000 });
    logInfo.log('info', `Server running in ${process.env.NODE_ENV} mode at http://localhost:${process.env.PORT}`);
  } catch (error) {
    logInfo.log('error', JSON.stringify(error));
    process.exit(1);
  }
})();