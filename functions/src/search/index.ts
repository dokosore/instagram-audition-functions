/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import * as functions from 'firebase-functions';
import { google } from 'googleapis';

const spreadsheetId = '1j_vaMXhNqEPHxG6_rmbQFnkZQfeeV9pHwXcmiCG9a5Y';

export const searchByHashtag = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  await search();
  res.send('Hello from Firebase!');
});

const search = async () => {
  const auth = await google.auth.getClient({
    keyFile: './instagram-audition-bot-ab9d031cc339.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const range = 'ユーザーリスト';
  const apiOptions = {
    auth,
    spreadsheetId,
    range,
  };

  const sheets = google.sheets('v4');
  sheets.spreadsheets.values.get(apiOptions, (err: any, res: any) => {
    console.log(err);
    console.log(res.data.values);
  });
};
