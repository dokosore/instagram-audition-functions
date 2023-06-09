import * as functions from 'firebase-functions';

import { sendDmByAccount } from '../sendDm';

export const localSendDmTest = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  await sendDmByAccount(1);
  res.send('完了');
});
