import express from 'express';
import winston from 'winston';
import { promises } from 'fs';

const readFile = promises.readFile;
const writeFile = promises.writeFile;

const router = express.Router();

global.jsonURL = 'accounts.json';

// POST TO INSERT
router.post('/', async (req, res) => {
  let account = req.body;
  try {
    let data = await readFile(jsonURL, 'utf8');
    let json = JSON.parse(data);

    account = {
      id: json.nextId++,
      ...account,
    };

    json.accounts.push(account);

    await writeFile(jsonURL, JSON.stringify(json));
    res.end();

    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
    logger.error(`POST /account - ${JSON.stringify(err.message)}`);
  }
});

// GET TO VISUALIZE
router.get('/', async (_, res) => {
  try {
    let data = await readFile(jsonURL, 'utf8');
    let json = JSON.parse(data);

    delete json.nextId;
    res.send(json);

    logger.info('GET /accounts');
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
    logger.error(`GET /accounts - ${JSON.stringify(err.message)}`);
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
  try {
    let data = await readFile(jsonURL, 'utf8');
    let json = JSON.parse(data);

    const accountFound = json.accounts.find(
      (account) => account.id === parseInt(req.params.id, 10)
    );
    if (accountFound) {
      res.send(accountFound);
      logger.info(`GET /account/:id - ${JSON.stringify(accountFound)}`);
    } else {
      res.send('Account not found');
      res.end();
      logger.info('GET /account/:id');
    }
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
    logger.error(`GET /account/:id - ${JSON.stringify(err.message)}`);
  }
});

// DELETE BY ID
router.delete('/:id', async (req, res) => {
  try {
    let data = await readFile(jsonURL, 'utf8');

    let json = JSON.parse(data);
    let accounts = json.accounts.filter(
      (account) => account.id !== parseInt(req.params.id, 10)
    );
    json.accounts = accounts;

    await writeFile(jsonURL, JSON.stringify(json));
    res.send(`Account deleted - ID: ${req.params.id}`);
    res.end();

    logger.info(`DELETE /accounts - account ID: ${req.params.id}`);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
    logger.error(`DELETE /accounts - ${JSON.stringify(err.message)}`);
  }
});

// PUT TO UPDATE
router.put('/', async (req, res) => {
  try {
    let updateAccount = req.body;
    let data = await readFile(jsonURL, 'utf8');

    let json = JSON.parse(data);
    let oldIndex = json.accounts.findIndex(
      (account) => account.id === updateAccount.id
    );
    //atualização de campos específicos dentro da api
    json.accounts[oldIndex].name = updateAccount.name;
    json.accounts[oldIndex].balance = updateAccount.balance;

    await writeFile(jsonURL, JSON.stringify(json));
    res.send(updateAccount);
    res.end();

    logger.info(`PUT /accounts - ${JSON.stringify(updateAccount)}`);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
    logger.error(`PUT /accounts - ${JSON.stringify(err.message)}`);
  }
});

// TRANSACTIONS
router.post('/transaction', async (req, res) => {
  try {
    let params = req.body;
    let data = await readFile(jsonURL, 'utf8');

    let json = JSON.parse(data);
    let index = json.accounts.findIndex((account) => account.id === params.id);

    if (params.value <= 0 && json.accounts[index].balance + params.value < 0) {
      throw new Error('Não há saldo suficiente.');
    }
    json.accounts[index].balance += params.value;

    await writeFile(jsonURL, JSON.stringify(json));
    res.send(json.accounts[index]);

    logger.info(
      `POST /accounts/transaction - ${JSON.stringify(req.params.id)}`
    );
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
    logger.error(`POST /accounts/transaction - ${JSON.stringify(err.message)}`);
  }
});

// EXPORT ROUTE
export default router;
