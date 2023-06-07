import * as functions from 'firebase-functions';

import { helloWorld } from './helloWorld';
import { searchByHashtag } from './search';
import { sendDmByAccount } from './sendDm';
import { sendSlack } from './slack';

export const helloWorldApi = helloWorld;
export const searchByHashtagApi = searchByHashtag;

export const cronTest = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 1 minutes')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendSlack('Function稼働中');
    return;
  });

export const sendDm0 = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(0);
    return;
  });

export const sendDm1 = functions
  .region('asia-northeast1')
  .pubsub.schedule('1 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(1);
    return;
  });

export const sendDm2 = functions
  .region('asia-northeast1')
  .pubsub.schedule('2 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(2);
    return;
  });

export const sendDm3 = functions
  .region('asia-northeast1')
  .pubsub.schedule('3 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(3);
    return;
  });
