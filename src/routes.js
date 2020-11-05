import express from 'express';

import ERedeController from './controllers/ERede';

const routes = express.Router();

routes.post('/createTransaction', ERedeController.createTransaction);
routes.get('/cancelTransaction', ERedeController.cancelTransaction);
routes.get('/showTransaction', ERedeController.showTransaction);

export default routes;
