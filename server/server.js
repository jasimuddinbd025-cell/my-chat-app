const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5001 });
console.log("WebSocket server running on port 5001");

const scriptMessages = [
  "That's great! We can get to know each other better!",
  "I would love to share more about myself.",
  "Are you excited to continue chatting with me?",
  "Thanks for being here ❤️"
];

wss.on("connection", (ws) => {
  console.log("✅ A user connected");

  let scriptIndex = 0;
  let waitingForUser = true;

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);
      console.log("📩 Received from client:", data);

      // Only respond if it's user's turn
      if (waitingForUser && data.from === "user") {
        waitingForUser = false;

        if (scriptIndex < scriptMessages.length) {
          const reply = scriptMessages[scriptIndex];
          scriptIndex++;

          setTimeout(() => {
            ws.send(JSON.stringify({ type: "text", text: reply }));
            waitingForUser = true; // user can send next message
          }, 1000); // simulate typing delay
        }
      }
    } catch (err) {
      console.error(err);
    }
  });

  ws.on("close", () => console.log("❌ A user disconnected"));
});
