import { Client, SQSHandler } from './src/index';
import { Events } from './src/types';
import { SQSClientConfig } from '@aws-sdk/client-sqs';

(async () => {
  try {
    const config: SQSClientConfig = { region: 'region' };
    const h = new SQSHandler(config);
    const c = new Client(h, { squadName: 'squad', serviceName: 'service', domain: 'domain' });
    await c.publish(Events.LOAN_CREATE, { source: 'source', data: ['data'], queueName: 'queue' });
  } catch (e) {
    // Deal with the fact the chain failed
  }
  // `text` is not available here
})();
