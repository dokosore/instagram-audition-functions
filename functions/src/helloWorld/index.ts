import * as functions from 'firebase-functions';

export const helloWorld = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.send('Hello from Firebase!');
});
