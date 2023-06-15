import { EventEmitter } from "stream";
import { WebSocket } from "ws";
import { MyServer } from "./MyServer";

/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-15 19:11:59
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-15 19:41:01
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Core\Connection.ts
 * @Description  : 
 */
export class Connection extends EventEmitter {

    private mgsMap: Map<string, Array<IItem>> = new Map();
    constructor(public server: MyServer, public ws: WebSocket) {
        super();
        this.ws.on("close", () => {
            this.emit("close");
        });
        this.ws.on("message", (buffer: Buffer) => {
            const str = buffer.toString();
            try {
                const msg = JSON.parse(str);
                const { name, data } = msg;
                const { frameID, input } = data;
            } catch (error) {
                console.log(error);
            }
        });
    }

    public sendMsg(name: string, data) {
        let msg = {
            name,
            data,
        }
        this.ws.send(JSON.stringify(msg));
    }

    public listenMsg(name: string, cb: Function, ctx: unknown) {
        if (this.mgsMap.has(name)) {
            this.mgsMap.get(name).push({ cb, ctx });
        } else {
            this.mgsMap.set(name, [{ cb, ctx }]);
        }
    }
    public unListenMsg(name: string, cb: Function, ctx: unknown) {
        if (this.mgsMap.has(name)) {
            const index = this.mgsMap.get(name).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.mgsMap.get(name).splice(index, 1);
        }
    }
}

interface IItem {
    cb: Function;
    ctx: unknown;
}