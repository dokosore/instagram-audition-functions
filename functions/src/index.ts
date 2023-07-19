import * as functions from 'firebase-functions';

import { searchByHashtag } from './search';
import { sendDmByAccount } from './sendDm';

// export const localSendDmTestApi = localSendDmTest;

// export const searchTargetUserApi = functions
//   .runWith({
//     timeoutSeconds: 500,
//     memory: '2GB',
//   })
//   .region('asia-northeast1')
//   .https.onRequest(async (req, res) => {
//     try {
//       await searchByHashtag(0, 'アイドル志望', 100);
//       res.send('Success');
//     } catch (e) {
//       res.send('Error');
//     }
//   });

export const searchTargetUser = functions
  .region('asia-northeast1')
  // .pubsub.schedule('0 6 * * *')
  .pubsub.schedule('30 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await searchByHashtag(0, 'フリーモデル', 100);
    functions.logger.info('Function稼働中');
    return;
  });

// export const sendDm0 = functions
//   .region('asia-northeast1')
//   .pubsub.schedule('0 * * * *')
//   .timeZone('Asia/Tokyo')
//   .onRun(async () => {
//     await sendDmByAccount(0);
//     functions.logger.info('Function稼働中');
//     return;
//   });

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

// export const sendDm4 = functions
//   .region('asia-northeast1')
//   .pubsub.schedule('20 * * * *')
//   .timeZone('Asia/Tokyo')
//   .onRun(async () => {
//     await sendDmByAccount(4);
//     functions.logger.info('Function稼働中');
//     return;
//   });
