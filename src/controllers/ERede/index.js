import eRede from '../../lib/erede/lib/erede';
import Transaction from '../../lib/erede/lib/transaction';
import store from '../../config/erede';
import connection from '../../database';

class ERedeController {
  async createTransaction(req, res) {
    const {
      cardNumber,
      cardCVV,
      cardMonth,
      cardYear,
      cardName,
      valTotal,
      orderID,
    } = req.body;

    try {
      const transaction = new Transaction(valTotal, `pedido-${orderID}`)
        .creditCard(cardNumber, cardCVV, cardMonth, cardYear, cardName)
        .autoCapture(false);

      const authorizeTransaction = await new eRede(store).create(transaction);

      const { tid } = authorizeTransaction;

      if (authorizeTransaction.returnCode === '00') {
        await connection('payments').insert({
          tid,
        });

        return res.send({
          data: authorizeTransaction,
          success: true,
        });
      }
    } catch (error) {
      return res.send({
        data: error,
        success: false,
      });
    }
  }

  async cancelTransaction(req, res) {
    const { idTransaction, valTotal } = req.body;

    const data = {
      tid: idTransaction,
      Amount: valTotal,
    };

    try {
      const cancelTransaction = await new eRede(store).cancel(data);

      if (cancelTransaction.returnCode === '359') {
        return res.status(200).json(cancelTransaction.returnMessage);
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async showTransaction(req, res) {
    const { idTransaction } = req.body;

    const { tid } = await connection('payments')
      .select('tid')
      .first()
      .where({ tid: idTransaction })
      .timeout(1000);

    if (tid) {
      const transactionInfo = await new eRede(store).getByTid(tid);
      return res.json(transactionInfo);
    }
  }
}

export default new ERedeController();
