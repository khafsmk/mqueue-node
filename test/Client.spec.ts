import { Client } from '../src';
import { EventInput, Record, Handler, CommandOutput, Events } from '../src/types';

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
      await c.publish(Events.LOAN_CREATE, input);
    } catch (err) {
      throw new Error(`want no error, got: ${err}`);
    }
  });
});
