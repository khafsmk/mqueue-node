import { PutEventsCommandOutput } from "@aws-sdk/client-eventbridge";
import { CreateQueueCommandOutput } from "@aws-sdk/client-sqs";

export interface Record {
  uuid: string;
  eventTarget: string;
  source: string;
  serviceName: string;
  event: string;
  timestamp: Date;
  metadata?: any;
  data: any;
}

export type CommandOutput = PutEventsCommandOutput | CreateQueueCommandOutput;

export interface Handler {
  handle(record: Record): Promise<CommandOutput>;
}


