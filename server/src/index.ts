import { Server } from "socket.io";
import http from "http";

import { app } from "./app/app";
import { ApiError } from "../src/lib/custom-api-error-class";
import { connectMongoose } from "../src/lib/mongoose";
import { origins } from "./lib/utils";

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: origins,
  },
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
  });
});

httpServer.listen(3001, async () => {
  try {
    const mongoseInstance = await connectMongoose();
    console.log("Connected to MongoDB at : " + mongoseInstance.connection.host);
  } catch (error: any) {
    throw new ApiError(" Failed to connect to MongoDB " + error.message, 500);
  }
});
