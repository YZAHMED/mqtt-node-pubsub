// receiver.js
import mqtt from 'mqtt';

// Connect to a public test broker
const brokerUrl = 'mqtt://broker.hivemq.com';
const topic = 'my-node-project/mqtt-communication';

console.log(`⏳ Connecting to broker: ${brokerUrl}...`);
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('✅ Connected to broker successfully!');
  
  // Subscribe to the topic
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`📡 Listening for messages on: "${topic}"...`);
    } else {
      console.error('❌ Subscription error:', err);
    }
  });
});

// Fire this event whenever a new message arrives
client.on('message', (receivedTopic, message) => {
  // The message comes in as a Buffer, so we convert it to a string
  console.log(`\n📥 [NEW MESSAGE] on ${receivedTopic}:`);
  console.log(`   👉 ${message.toString()}`);
});

// Handle errors
client.on('error', (error) => {
  console.error('❌ Connection failed:', error);
  client.end();
});