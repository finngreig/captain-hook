import express from "express";
import ClientHandler from "./client_handler";

let WEBHOOK_PORT = null;
let INTERNAL_PORT = null;

const app = express();

const clientHandler = new ClientHandler(INTERNAL_PORT);

/**
 * This endpoint handles all our webhooks - third party services should be pointed to `https://{host}/webhook`
 */
app.post("/webhook", async (req, res) => {
    await clientHandler.send(req);
    return res.status(200);
});

app.listen(WEBHOOK_PORT, () => {
    console.log(`Captain Hook now listening for webhooks on :${WEBHOOK_PORT}`);
});