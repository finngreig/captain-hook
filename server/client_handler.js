import { Server } from "socket.io";
import fastq from "fastq";

class ClientHandler {
    port;
    #io;
    #sockets = [];
    #queue = fastq.promise(this.#processMessage, 2);
    
    constructor(port) {
        this.port = port;
        this.io = new Server(this.port);

        this.io.on("connection", socket => {
            sockets.push(socket);
        });
    }

    #createClientObject(req) {
        return {
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
            headers: req.headers,
            body: req.body
        }
    }

    async #processMessage(object) {
        this.#sockets.forEach(socket => {
            socket.emit("webhook", object);
        });
    }

    async send(object) {
        await this.#queue.push(object);
    }
}