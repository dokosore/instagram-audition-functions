/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { google } from 'googleapis';

import { SPREADSHEET_ID } from '../const';

export interface Account {
  userName: string;
  password: string;
  message: string;
}

export const getAccounts = async (accountNum: number): Promise<Account | null> => {
  const auth = await google.auth.getClient({
    keyFile: './instagram-audition-bot-ab9d031cc339.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: '条件設定',
  });

  if (!res.data.values) return null;
  const activeAccountList = res.data.values.filter((row: any) => row[0] === '運用中');
  if (activeAccountList.length - 1 < accountNum) return null;
  const activeAccount = activeAccountList[accountNum];
  const _userName = activeAccount[2] as string;
  const _password = activeAccount[3] as string;
  const _message = activeAccount[7] as string;

  return {
    userName: _userName,
    password: _password,
    message: _message,
  } as Account;
};
