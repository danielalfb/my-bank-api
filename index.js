import express from 'express';
import winston from 'winston';
import {
  promises
} from 'fs';
import cors from 'cors';
import accountsRouter from './routes/accounts.js';
import swaggerUi from 'swagger-ui-express';
import {
  swaggerDocument
} from './doc.js';

const app = express();

const readFile = promises.readFile;
const writeFile = promises.writeFile;

const {
  combine,
  timestamp,
  label,
  printf
} = winston.format;
const myFormat = printf(({
  level,
  message,
  label,
  timestamp
}) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.jsonURL = 'accounts.json';
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'my-bank-api.log'
    }),
  ],
  format: combine(label({
    label: 'my-bank-api'
  }), timestamp(), myFormat),
});

app.use(express.json());
app.use('/accounts', accountsRouter);
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, async () => {
  try {
    await readFile(jsonURL, 'utf8');
    logger.info('API STARTED!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(jsonURL, JSON.stringify(initialJson)).catch((err) => {
      logger.error(err);
    });
  }
});