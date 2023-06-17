import { EventEmitter } from "stream";
import { WebSocket } from "ws";
import { IModule } from "../Common";
import { MyServer } from "./MyServer";

/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-15 19:11:59
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 10:12:23
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
                if (server.apiMap.has(name)) {
                    try {

                        const cb = server.apiMap.get(name);
                        const res = cb.call(null, this, data);
                        this.sendMsg(name, {
                            success: true,
                            res,
                        });

                    } catch (e) {
                        this.sendMsg(name, {
                            success: false,
                            error: e.message,
                        });
                    }
                }
                else if (this.mgsMap.has(name)) {

                    try {
                        this.mgsMap.get(name).forEach(({ cb, ctx }) => {
                            cb.call(ctx, data);
                        });

                    } catch (error) {
                        console.log(error);
                    }
                }

            } catch (error) {
                console.log(error);
            }
        });
    }

    public sendMsg<T extends keyof IModule["msg"]>(name: T, data: IModule["msg"][T]) {
        let msg = {
            name,
            data,
        }
        this.ws.send(JSON.stringify(msg));
    }

    public listenMsg<T extends keyof IModule["msg"]>(name: T, cb: (args: IModule["msg"][T]) => void, ctx: unknown) {
        if (this.mgsMap.has(name)) {
            this.mgsMap.get(name).push({ cb, ctx });
        } else {
            this.mgsMap.set(name, [{ cb, ctx }]);
        }
    }
    public unListenMsg<T extends keyof IModule["msg"]>(name: T, cb: (args: IModule["msg"][T]) => void, ctx: unknown) {
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