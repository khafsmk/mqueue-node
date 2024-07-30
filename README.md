# Multi Queue Clients for JS

Multiple queue for node client


## For eventbridge
```ts
let eb = new EventBridgeHandler(config)
const client = new Client(eb, { squadName: 'squad', serviceName: 'service', domain: 'domain' });

// publish event
client.publish(Events.LOAN_UPDATE)
```