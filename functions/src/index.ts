import * as functions from 'firebase-functions';

import { helloWorld } from './helloWorld';
import { searchByHashtag } from './search';
import { sendDmByAccount } from './sendDm';

export const helloWorldApi = helloWorld;
export const searchByHashtagApi = searchByHashtag;

export const sendDm0 = functions
  .region('asia-northeast1')
  .pubsub.schedule('* */1 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(0);
  });

export const sendDm1 = functions
  .region('asia-northeast1')
  .pubsub.schedule('1 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(1);
  });

export const sendDm2 = functions
  .region('asia-northeast1')
  .pubsub.schedule('2 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(2);
  });

export const sendDm3 = functions
  .region('asia-northeast1')
  .pubsub.schedule('3 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(3);
  });
