import * as functions from 'firebase-functions';

import { searchByHashtag } from './search';
import { sendDmByAccount } from './sendDm';
import { localSendDmTest } from './test';

export const localSendDmTestApi = localSendDmTest;

export const searchTargetUserApi = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  try {
    await searchByHashtag(0, 'フリーモデル', 10);
    res.send('Success');
  } catch (e) {
    res.send('Error');
  }
});

// export const searchTargetUser = functions
//   .region('asia-northeast1')
//   .pubsub.schedule('0 6 * * *')
//   .timeZone('Asia/Tokyo')
//   .onRun(async () => {
//     await searchByHashtag();
//     functions.logger.info('Function稼働中');
//     return;
//   });

export const sendDm0 = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(0);
    functions.logger.info('Function稼働中');
    return;
  });

export const sendDm1 = functions
  .region('asia-northeast1')
  .pubsub.schedule('5 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(1);
    functions.logger.info('Function稼働中');
    return;
  });

export const sendDm2 = functions
  .region('asia-northeast1')
  .pubsub.schedule('10 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(2);
    functions.logger.info('Function稼働中');
    return;
  });

export const sendDm3 = functions
  .region('asia-northeast1')
  .pubsub.schedule('15 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(3);
    functions.logger.info('Function稼働中');
    return;
  });
