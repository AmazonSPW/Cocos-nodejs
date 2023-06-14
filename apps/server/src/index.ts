import { WebSocketServer } from "ws";
import { symlinkCommon } from "./Utils";

symlinkCommon();


const wss = new WebSocketServer({
    port: 9876,
});

wss.on("connection", (socket) => {
    socket.on("message", (buffer) => {
        console.log(`SWP log_____________ ${buffer.toString()}`);
    });

    let obj = {
        name: "haha",
        data: "haha123",
    }
    socket.send(JSON.stringify(obj));
});

wss.on("listening", () => {
    console.log(`SWP log_____________ 服务器启动`);
});