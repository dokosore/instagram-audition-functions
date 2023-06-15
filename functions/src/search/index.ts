/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { getAllTargetUserList } from '../common/getAllTargetUserList';
import { recordTargetUserList } from '../common/recordTargetUserList';
import { sendSlack } from '../common/sendSlack';
import { TargetUser, fetchTargetUsers } from './fetchTargetUsers';

export const searchByHashtag = async (accountNum: number, hashtag: string, limit: number): Promise<boolean> => {
  try {
    // ハッシュタグをもとに、ターゲットユーザーを検索する
    const targetUserList: TargetUser[] = await fetchTargetUsers(accountNum, hashtag, limit);

    // スプレッドシートからターゲットユーザーのリストを取得する
    const allTargetUserList: TargetUser[] = await getAllTargetUserList();

    // 重複がないリストを作成
    const _allTargetUserIdList: number[] = allTargetUserList.map((item) => item.userId);
    const unDuplicationTargetUserList: TargetUser[] = targetUserList.filter(
      (targetUser) => !_allTargetUserIdList.includes(targetUser.userId),
    );

    // ターゲットユーザーをスプレッドシートに追加する
    await recordTargetUserList(unDuplicationTargetUserList, hashtag);

    // 全て完了すれば、Slackに通知する
    await sendSlack(
      `ハッシュタグ「#${hashtag}」を用いて、${unDuplicationTargetUserList.length}件のユーザーを追加しました`,
    );
    return true;
  } catch (e) {
    const error = e as any;
    const message: string = error.message || 'エラーが発生しました';
    await sendSlack(`ハッシュタグ検索時にエラーが発生しました ${message}`);
    return false;
  }
};
