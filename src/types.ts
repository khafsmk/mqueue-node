import { PutEventsCommandOutput } from '@aws-sdk/client-eventbridge';
import { CreateQueueCommandOutput } from '@aws-sdk/client-sqs';

export const Events: { [key: string]: string; } = {
  'LOAN_UPDATE': 'loan_update',
  'LOAN_CREATE': 'loan_create',
};

export interface EventInput {
  source: string;
  data: any;
  queueName: string;
  metadata?: [string: any];
}

export interface Record extends EventInput {
  uuid: string;
  serviceName: string;
  event: string;
  timestamp: Date;
}

export type CommandOutput = PutEventsCommandOutput | CreateQueueCommandOutput;

export interface Handler {
  handle(record: Record): Promise<CommandOutput>;
}
