import express from "express";
import { Server } from "socket.io";

let WEBHOOK_PORT = null;
let INTERNAL_PORT = null;

const app = express();

app.post("/webhook", async (req, res) => {
    const message = createClientObject(req);
    sockets.forEach(socket => socket.emit("webhook", message))
    return res.status(200);
});