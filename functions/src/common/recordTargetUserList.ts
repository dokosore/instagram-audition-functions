/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { google } from 'googleapis';

import { SPREADSHEET_ID } from '../const';
import { TargetUser } from '../search/fetchTargetUsers';

export const recordTargetUserList = async (targetUserList: TargetUser[], hashtag: string): Promise<void> => {
  const auth = await google.auth.getClient({
    keyFile: './instagram-audition-bot-ebdaa0ae8811.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'ユーザーリスト',
  });

  if (!res.data.values) return;

  for (const targetUser of targetUserList) {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'ユーザーリスト',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['FALSE', targetUser.userId, targetUser.userName, hashtag]],
      },
    });
  }
};
