import mqtt from "mqtt";

const brokerUrl = 'mqtt://broker.hivemq.com';
const topic = 'my-node-project/mqtt-communication';

console.log(`⏳ Connecting to broker: ${brokerUrl}...`);
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('✅ Connected to broker successfully!');
  
  // Create a payload (can be a string or a JSON object)
  const payload = JSON.stringify({
    timestamp: new Date().toISOString(),
    status: 'active',
    message: 'Hello from the Node.js Sender!'
  });

  console.log(`📤 Sending message to "${topic}"...`);
 console.log(new Date().toISOString())

  // Publish the message
  client.publish(topic, payload, (err) => {
    if (err) {
      console.error('❌ Failed to send message:', err);
    } else {
      console.log('✅ Message sent successfully!');
    }
    
    // Close the connection immediately after sending
    client.end();
  });
});

// Handle errors
client.on('error', (error) => {
  console.error('❌ Connection failed:', error);
  client.end();
});