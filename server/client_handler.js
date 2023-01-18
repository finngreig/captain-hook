import { Server } from "socket.io";
import fastq from "fastq";

export default class ClientHandler {
    port;
    #io;
    #sockets = [];
    #queue = fastq.promise(this.#processMessage, 2);
    
    /**
     * Constructor for the class
     * This stores the port, creates a socket.io server and ensures that when websockets are being opened that they're handled
     * @param {number} port     The port to listen for clients on
     */
    constructor(port) {
        this.port = port;
        this.#io = new Server(this.port);

        this.#io.on("connection", socket => {
            sockets.push(socket);
        });
    }

    /**
     * Method to take an Express request and transform it into a common wire format that the client can understand
     * @param {*} req   An Express Request object
     * @returns         An object with just the essential properties needed to relay the webhook to the end application
     */
    #createClientObject(req) {
        return {
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
            headers: req.headers,
            body: req.body
        }
    }

    /**
     * Handles a wire format message sitting in the queue - this sends it to the connected clients
     * @param {*} object    The object with the properties for relaying the webhook
     */
    async #processMessage(object) {
        this.#sockets.forEach(socket => {
            socket.emit("webhook", object);
        });
    }

    /**
     * Used in Express route handlers to pass the incoming webhook data to connected clients
     * @param {*} object    An Express Request object
     */
    async send(object) {
        await this.#queue.push(this.#createClientObject(object));
    }
}