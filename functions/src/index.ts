import * as functions from 'firebase-functions';

import { helloWorld } from './helloWorld';
import { searchByHashtag } from './search';
import { sendDmByAccount } from './sendDm';
import { localSendDmTest } from './test';

export const helloWorldApi = helloWorld;
export const searchByHashtagApi = searchByHashtag;
export const localSendDmTestApi = localSendDmTest;

// export const cronTest = functions
//   .region('asia-northeast1')
//   .pubsub.schedule('every 1 hours')
//   .timeZone('Asia/Tokyo')
//   .onRun(async () => {
//     await sendSlack('Function稼働中');
//     functions.logger.info('Function稼働中');
//     return;
//   });

export const sendDm0 = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 1 hours')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(0);
    functions.logger.info('Function稼働中');
    return;
  });

export const sendDm1 = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 1 hours')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(1);
    functions.logger.info('Function稼働中');
    return;
  });

export const sendDm2 = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 1 hours')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(2);
    functions.logger.info('Function稼働中');
    return;
  });

export const sendDm3 = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 1 hours')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(3);
    functions.logger.info('Function稼働中');
    return;
  });
