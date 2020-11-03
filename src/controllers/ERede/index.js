import { eRede, Transaction } from 'erede-node';

// class store
import store from '../../config/erede';

class ERedeController {
  async authorizeTransaction(req, res) {
    const { cardNumber } = req.body;
    const { cardCVV } = req.body;
    const { cardDay } = req.body;
    const { cardMonth } = req.body;
    const { cardName } = req.body;
    const { valTotal } = req.body;

    const transaction = new Transaction(valTotal, 'ref1234')
      .creditCard(cardNumber, cardCVV, cardDay, cardMonth, cardName)
      .autoCapture(false);

    new eRede(store)
      .create(transaction)
      .then((transaction) => {
        if (transaction.returnCode === '00') {
          res.send(`Transação autorizada com sucesso: ${transaction.tid}`);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  async createTransaction(req, res) {}

  async cancelTransaction(req, res) {}
}

export default new ERedeController();
