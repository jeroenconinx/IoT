const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mqtt = require('mqtt');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });



const protocol = 'mqtt';
const host = '192.168.57.67';
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `${protocol}://${host}:${port}`;


const mqttClient = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'web',
    password: '12345678',
    reconnectPeriod: 1000,
})

// Connect to the MQTT broker
mqttClient.on('connect', function () {
  console.log('Connected to MQTT broker');
})

mqttClient.subscribe('ballstatus');

mqttClient.on('message', function (topic, message) {
  var msg = JSON.parse(message);
  console.log("topic: " + topic + " msg: ");
  console.log(msg);
});

wss.on('connection', function connection(ws) {
  console.log('ws connection!!');

  mqttClient.on('message', function(topic, packedCoordinate) {
    var x = (packedCoordinate >> 16) & 0xFFFF;
    var y = packedCoordinate & 0xFFFF;
    var payload = {x: x, y: y}

    ws.send(JSON.stringify(payload));
  });
});

// MQTT middleware for publishing and subscribing
app.use(cors());
app.use(bodyParser.json());

app.post('/set', function (req, res) {
    console.log(req.body)
    var packedCoordinate = (req.body.x << 16 | req.body.y);
    console.log(packedCoordinate);
    mqttClient.publish('coordinate', packedCoordinate.toString());
    res.sendStatus(200);
})

server.listen(3000, () => {
  console.log('Server running on 3000');
})