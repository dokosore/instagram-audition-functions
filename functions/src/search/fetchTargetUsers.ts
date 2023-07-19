/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// import fetch from 'node-fetch';

import { getAccounts } from '../common/getAccount';
import { sendSlack } from '../common/sendSlack';
import { SEARCH_BY_HASHTAG_API_URL } from '../const';

export interface TargetUser {
  userId: number;
  userName: string;
}

export const fetchTargetUsers = async (accountNum: number, hashtag: string, limit: number): Promise<TargetUser[]> => {
  // 使用するアカウントを取得
  const account = await getAccounts(accountNum);
  if (!account) {
    await sendSlack('ハッシュタグ検索用のアカウントが見つかりませんでした');
    throw new Error('ハッシュタグ検索用のアカウントが見つかりませんでした');
  }

  const data = {
    user_name: account.userName,
    password: account.password,
    word: hashtag,
    limit: limit,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(SEARCH_BY_HASHTAG_API_URL, options);
    const json = await response.json();

    if (!response.ok) {
      await sendSlack('ハッシュタグ検索時にエラーが発生しました');
      throw new Error('ハッシュタグ検索時にエラーが発生しました');
    }

    const users = json.users as any[];
    const targetUserList: TargetUser[] = users.map((user) => {
      return {
        userId: user.user_id as number,
        userName: user.user_name as string,
      } as TargetUser;
    });

    // const targetUserList: TargetUser[] = [];
    return targetUserList;
  } catch (e) {
    const error = e as any;
    const message: string = error.message || 'エラーが発生しました';
    await sendSlack(`ハッシュタグ検索時にエラーが発生しました ${message}`);
    throw new Error(`ハッシュタグ検索時にエラーが発生しました ${message}`);
  }
};
