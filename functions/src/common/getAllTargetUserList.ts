/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { google } from 'googleapis';

import { SPREADSHEET_ID } from '../const';
import { TargetUser } from '../search/fetchTargetUsers';

export const getAllTargetUserList = async (): Promise<TargetUser[]> => {
  const auth = await google.auth.getClient({
    keyFile: './instagram-audition-bot-ebdaa0ae8811.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'ユーザーリスト',
  });

  if (!res.data.values) throw new Error('ユーザーリストが見つかりませんでした');

  const _targetUserList: TargetUser[] = [];

  for (let i = 0; i < res.data.values.length; i++) {
    const targetUser: TargetUser = {
      userId: parseInt(res.data.values[i][1] as string),
      userName: res.data.values[i][2],
    };
    _targetUserList.push(targetUser);
  }

  return _targetUserList;
};
