import { PutEventsCommandOutput } from '@aws-sdk/client-eventbridge';
import { CreateQueueCommandOutput } from '@aws-sdk/client-sqs';

export enum Events {
  LoanUpdate = 'loan_update',
  LoanCreate = 'loan_create',
}

export type EventString = keyof typeof Events;

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
