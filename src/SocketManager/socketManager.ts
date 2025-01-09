import { Server } from "socket.io";

export default class SocketManager {
    public room : string = "";
    private io: Server;
    public socket: any;

    constructor(server: Server){
        this.io = server;
    }

    getRoom(){
        // get and set the room and send it up by returning
        this.room = "testRoom";
        return this.room;
    }

    emitToRoom(event: string, data: object){
        this.io.to(this.room).emit(`server-${event}`, data);
    }
}