/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as slack from '@slack/webhook';

import { Settings, getSettings } from './getSettings';

export const sendSlack = async (message: string) => {
  const settings: Settings = await getSettings();
  if (!settings.slackNotification) return;
  const webhookUrl = 'https://hooks.slack.com/services/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';
  const webhook = new slack.IncomingWebhook(webhookUrl);
  await webhook.send(message);
};
