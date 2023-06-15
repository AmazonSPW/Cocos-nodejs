import { WebSocketServer } from "ws";
import { ApiMsgEnum } from "./Common";
import { symlinkCommon } from "./Utils";

symlinkCommon();


const wss = new WebSocketServer({
    port: 9876,
});

let inputs = [];

wss.on("connection", (socket) => {
    socket.on("message", (buffer) => {
        let str = buffer.toString();
        console.log(`SWP log_____________ 服务端接收到的信息  `);
        try {
            let msg = JSON.parse(str);
            let { name, data } = msg;
            let { frameID, input } = data;
            inputs.push(input);
        } catch (error) {
            console.log(error);
        }
    });


    setInterval(() => {
        const temp = inputs;
        inputs = [];
        let msg = {
            name: ApiMsgEnum.MsgServerSync,
            data: {
                inputs: temp,
            }
        }
        socket.send(JSON.stringify(msg));
    }, 100);
});

wss.on("listening", () => {
    console.log(`SWP log_____________ 服务器启动`);
});