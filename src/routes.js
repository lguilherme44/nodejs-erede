import express from 'express';

import ERedeController from './controllers/ERede';

const routes = express.Router();

routes.get('/authorize', ERedeController.authorizeTransaction);
routes.get('/cancel', ERedeController.cancelTransaction);
routes.get('/create', ERedeController.createTransaction);

export default routes;
