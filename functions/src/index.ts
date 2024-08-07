import * as functions from 'firebase-functions';

import { searchByHashtag } from './search';
import { sendDmByAccount } from './sendDm';
import { localSendDmTest } from './test';

export const localSendDmTestApi = localSendDmTest;

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

// ターゲットユーザーのIDを抽出する用関数
export const searchTargetUser = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 6 * * *')
  // .pubsub.schedule('30 * * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await searchByHashtag(0, '美味しそうなパスタ飯', 1); // 条件表のアカウントリストのステータス「運用中」の上から1番目
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

// 送信関数1
export const sendDm1 = functions
  .region('asia-northeast1')
  .pubsub.schedule('5 * * * *') // 毎時5分に実行
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    await sendDmByAccount(1);    // 条件表のアカウントリストのステータス「運用中」の上から2番目
    functions.logger.info('Function稼働中');
    return;
  });

// 送信関数2
// export const sendDm2 = functions
//   .region('asia-northeast1')
//   .pubsub.schedule('10 * * * *') // 毎時10分に実行
//   .timeZone('Asia/Tokyo')
//   .onRun(async () => {
//     await sendDmByAccount(2);  // 条件表のアカウントリストのステータス「運用中」の上から3番目
//     functions.logger.info('Function稼働中');
//     return;
//   });

// 送信関数3
// export const sendDm3 = functions
//   .region('asia-northeast1')
//   .pubsub.schedule('15 * * * *')
//   .timeZone('Asia/Tokyo')
//   .onRun(async () => {
//     await sendDmByAccount(3);  // 条件表のアカウントリストのステータス「運用中」の上から4番目
//     functions.logger.info('Function稼働中');
//     return;
//   });

// 送信関数4
// export const sendDm4 = functions
//   .region('asia-northeast1')
//   .pubsub.schedule('20 * * * *') // 毎時20分に実行
//   .timeZone('Asia/Tokyo')
//   .onRun(async () => {
//     await sendDmByAccount(4);  // 条件表のアカウントリストのステータス「運用中」の上から5番目
//     functions.logger.info('Function稼働中');
//     return;
//   });
