/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { google } from 'googleapis';

import { SPREADSHEET_ID } from '../const';

export interface Settings {
  slackNotification: boolean;
}

export const getSettings = async (): Promise<Settings> => {
  const auth = await google.auth.getClient({
    keyFile: './instagram-audition-bot-ab9d031cc339.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'bot設定',
  });

  if (!res.data.values) throw new Error('設定が見つかりませんでした');

  const _settings: Settings = {
    slackNotification: res.data.values[1][1] === 'ON',
  };

  return _settings;
};
