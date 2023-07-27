/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import fetch from 'node-fetch';

import { getAccounts } from '../common/getAccount';
import { getTargetUserId } from '../common/getTargetUserId';
import { sendSlack } from '../common/sendSlack';
import { SEND_DM_API_URL } from '../const';

export const sendDmByAccount = async (accountNum: number): Promise<boolean> => {
  const account = await getAccounts(accountNum);
  if (!account) {
    await sendSlack('アカウントが見つかりませんでした');
    return false;
  }
  const targetUserId = await getTargetUserId();
  if (!targetUserId) {
    await sendSlack('ターゲットユーザーが見つかりませんでした');
    return false;
  }

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

  try {
    const response = await fetch(SEND_DM_API_URL, options);
    if (!response.ok) {
      const message = await response.text();
      await sendSlack(`DMの送信時にエラーが発生しました ${message}`);
      return false;
    }
    await sendSlack(`アカウント ${account.userName} でDMを送信しました`);
  } catch (e) {
    const error = e as any;
    const message: string = error.message || 'エラーが発生しました';
    await sendSlack(`DMの送信に失敗しました ${message}`);
  }

  return true;
};
