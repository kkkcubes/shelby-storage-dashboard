import { io } from "socket.io-client";

export const socket = io(
  "https://shelby-storage-dashboard-1.onrender.com"
);