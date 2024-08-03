/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { google } from 'googleapis';

import { SPREADSHEET_ID } from '../const';

export const getTargetUserId = async (): Promise<number | null> => {
  const auth = await google.auth.getClient({
    keyFile: './instagram-audition-bot-ebdaa0ae8811.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'ユーザーリスト',
  });

  if (!res.data.values) return null;

  for (let i = 0; i < res.data.values.length; i++) {
    if (res.data.values[i][0] === 'FALSE') {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `'ユーザーリスト'!A${i + 1}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['TRUE']],
        },
      });

      const userId = res.data.values[i][1] as string;
      return parseInt(userId);
    }
  }
  return null;
};
