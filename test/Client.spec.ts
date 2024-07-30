// import { EventBridgeClientConfig } from '@aws-sdk/client-eventbridge';
import { Client } from '../src';
import { EventInput, Record, Handler, CommandOutput } from '../src/types';
// import { SQSClientConfig } from '@aws-sdk/client-sqs';
// import { FinalizeRequestMiddleware } from "@aws-sdk/types";

describe('fake handler', () => {
  it('fake handler ok', async () => {
    const handler: Handler = {
      handle: async function (record: Record): Promise<CommandOutput> {
        return await Promise.resolve({} as CommandOutput);
      },
    };
    let c = new Client(handler, { squadName: 'squad', serviceName: 'service', domain: 'domain' });
    const input: EventInput = { source: 'source', data: { key: 'value' }, queueName: 'queue' };
    try {
      await c.publish('LoanUpdate', input);
    } catch {
      throw new Error('should not throw');
    }
  });

  //   it('sqs handler', async () => {
  //     const interceptionMiddleware: FinalizeRequestMiddleware<any, any> = (next, context) => (args) => {
  //       return Promise.resolve({ output: { $metadata: { request: args.request } }, response: '' as any });
  //     };

  //     const config: SQSClientConfig = { region: 'region' };

  //     const h = new SQSHandler(config, {});
  //     let c = new Client(h, { squadName: 'squad', serviceName: 'service', domain: 'domain' });
  //     c.client.middlewareStack.add(interceptionMiddleware, { step: "finalizeRequest", name: "interceptionMiddleware" });

  //     const input: EventInput = { source: 'source', data: ['data'], queueName: 'queue' };
  //     await c.publish('LoanUpdate', input);
  //   });

  //   it('eventbridge handler', async () => {
  //     const config: EventBridgeClientConfig = { region: 'region' };
  //     const h = new EventBridgeHandler(config);
  //     let c = new Client(h, { squadName: 'squad', serviceName: 'service', domain: 'domain' });
  //     const input: EventInput = { source: 'source', data: ['data'], queueName: 'queue' };
  //     await c.publish('LoanUpdate', input);
  //   });
});
