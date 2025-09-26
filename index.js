// funny-telnet-server.js
const net = require("net");

// ANSI colors
const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const MAGENTA = "\x1b[35m";
const CYAN = "\x1b[36m";

const server = net.createServer((socket) => {
  console.log("Client connected");

  // Handle socket errors
  socket.on("error", (err) => {
    console.log("Socket error:", err.message);
  });

  // Welcome message
  socket.write("Welcome!\n");

  // Example animation
  let i = 0;
  const frames = ["😜", "🤪", "😎", "🤩"];
  const anim = setInterval(() => {
    if (socket.destroyed) { // Stop if socket closed
      clearInterval(anim);
      return;
    }
    socket.write("\rLoading " + frames[i % frames.length]);
    i++;
  }, 300);

  socket.on("data", (data) => {
    if (!socket.destroyed) {
      socket.write("\nYou typed: " + data.toString());
    }
  });

  socket.on("end", () => {
    clearInterval(anim);
    console.log("Client disconnected");
  });
});


// Run server on port 2323
const PORT = process.env.PORT || 2323;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Funny Telnet server running on port ${PORT}`);
});
