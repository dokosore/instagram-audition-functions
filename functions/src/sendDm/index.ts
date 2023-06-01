/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { google } from 'googleapis';

const spreadsheetId = '1j_vaMXhNqEPHxG6_rmbQFnkZQfeeV9pHwXcmiCG9a5Y';

export const sendDmByAccount = async (accountNum: number): Promise<boolean> => {
  const account = await getAccounts(accountNum);
  if (!account) {
    console.error('アカウントが見つかりませんでした');
    return false;
  }
  const targetUserId = await getTargetUserId();
  if (!targetUserId) {
    console.error('ターゲットユーザーが見つかりませんでした');
    return false;
  }

  const url = 'https://instagram-audition-api.herokuapp.com/send-dm';
  const data = {
    user_name: account.userName,
    password: account.password,
    message: account.message,
    user_id: targetUserId,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    console.error('DMの送信に失敗しました');
    return false;
  }

  return true;
};

interface Account {
  userName: string;
  password: string;
  message: string;
}

const getAccounts = async (accountNum: number) => {
  const auth = await google.auth.getClient({
    keyFile: './instagram-audition-bot-ab9d031cc339.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: auth });
  const range = '条件設定';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
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

const getTargetUserId = async (): Promise<number | null> => {
  const auth = await google.auth.getClient({
    keyFile: './instagram-audition-bot-ab9d031cc339.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: auth });
  const range = 'ユーザーリスト';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  if (!res.data.values) return null;

  for (let i = 0; i < res.data.values.length; i++) {
    if (res.data.values[i][0] === 'FALSE') {
      await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
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
