/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-15 19:03:23
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-15 20:16:28
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Core\MyServer.ts
 * @Description  : 
 */

import { WebSocket, WebSocketServer } from "ws";
import { ApiMsgEnum } from "../Common";
import { Connection } from "./Connection";

export class MyServer {
    public port: number;
    public wss: WebSocketServer;
    public connectons: Set<Connection> = new Set();
    public apiMap: Map<string, Function> = new Map();
    public constructor({ port }: { port: number }) {
        this.port = port;
    }

    public start() {
        return new Promise((resolve, reject) => {
            this.wss = new WebSocketServer({
                port: this.port,
            });

            this.wss.on("listening", () => { resolve(true) });
            this.wss.on("error", (e) => { reject(e) });
            this.wss.on("close", () => { reject(false) });
            this.wss.on("connection", (ws: WebSocket) => {
                let connect = new Connection(this, ws);
                this.connectons.add(connect);
                console.log(`SWP log_____________ 来人了`);

                connect.on("close", () => {
                    this.connectons.delete(connect);
                    console.log(`SWP log_____________ 走人了`);

                });
            });
        })
    }

    public setApi(name: ApiMsgEnum, cb: Function) {
        this.apiMap.set(name, cb);
    }
}