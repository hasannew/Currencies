/* eslint-disable @typescript-eslint/no-require-imports */

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 4000 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message); // Convert string to object
      console.log(`Received: ${data}`)
      // Broadcast received object to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data)); 
        }
      });
    } catch (error) {
      console.error("Invalid message format:", error);
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://localhost:4000");
