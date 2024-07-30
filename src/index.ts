import {
  EventBridgeClient,
  EventBridgeClientConfig,
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsCommandOutput,
} from '@aws-sdk/client-eventbridge';
const crypto = require('crypto');
import { CommandOutput, EventString,  EventInput, Handler, Record, Events } from './types';
import { CreateQueueCommand, CreateQueueCommandInput, SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';

export class Client {
  private squadName: string = '';
  private serviceName: string = '';
  private domain: string = '';
  private handler: Handler;
  private timeNow: () => Date;
  private newUUID: () => string;

  constructor(handler: Handler, options: { squadName: string; serviceName: string; domain: string }) {
    if (!handler) {
      throw new Error('handler is required');
    }

    this.squadName = options.squadName || this.squadName;
    this.serviceName = options.serviceName || this.serviceName;
    this.domain = options.domain || this.domain;
    this.handler = handler;
    this.timeNow = () => new Date();
    this.newUUID = () => crypto.randomUUID();
  }

  public async publish(event: EventString, input: EventInput): Promise<CommandOutput> {
    const evt = Events[event];
    if (!evt) {
      throw new Error(`unknown event: ${event}`);
    }
    const record: Record = {
      ...input,
      serviceName: this.serviceName,
      event: evt,
      timestamp: this.timeNow(),
      uuid: this.newUUID(),
    };
    return this.handler.handle(record);
  }
}

export class EventBridgeHandler implements Handler {
  private client: EventBridgeClient;
  constructor(config: EventBridgeClientConfig) {
    this.client = new EventBridgeClient(config);
  }
  async handle(record: Record): Promise<PutEventsCommandOutput> {
    const input: PutEventsCommandInput = {
      Entries: [
        {
          Time: record.timestamp,
          Source: record.source,
          Resources: [
            'STRING_VALUE', // TODO: replace with actual value
          ],
          DetailType: 'STRING_VALUE',
          Detail: 'STRING_VALUE',
          EventBusName: record.queueName,
          TraceHeader: 'STRING_VALUE',
        },
      ],
      EndpointId: 'STRING_VALUE',
    };
    const command = new PutEventsCommand(input);
    return await this.client.send(command);
  }
}

export class SQSHandler implements Handler {
  private client: SQSClient;
  constructor(config: SQSClientConfig) {
    this.client = new SQSClient(config);
  }
  async handle(record: Record): Promise<CommandOutput> {
    const input: CreateQueueCommandInput = {
      QueueName: record.queueName,
      Attributes: {},
      tags: {},
    };
    const command = new CreateQueueCommand(input);
    return await this.client.send(command);
  }
}
