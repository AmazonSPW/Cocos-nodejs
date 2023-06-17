/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-14 14:37:43
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 09:07:22
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Global\NetworkMgr.ts
 * @Description  : 
 */
import { Singleton } from "../Base/Singleton";
import { IModule } from "../Common";

@Singleton()
export class NetworkMgr {
    public static Instance: NetworkMgr;

    private port = 9876;
    private ws: WebSocket;

    private map: Map<string, Array<IItem>> = new Map();

    public isConnected: boolean = false;

    public connect() {
        return new Promise((resolve, reject) => {
            if (this.isConnected) {
                resolve(true);
                return;
            }
            this.ws = new WebSocket(`ws://localhost:${this.port}`);
            this.ws.onopen = () => {
                this.isConnected = true;
                resolve(true);
            }

            this.ws.onclose = () => {
                this.isConnected = false;
                reject(false);
            }

            this.ws.onerror = (e) => {
                this.isConnected = false;
                console.log(e);
                reject(false);
            }

            this.ws.onmessage = (e) => {
                try {
                    console.log("onMessage: ", e.data);
                    const json = JSON.parse(e.data);
                    const { name, data } = json;
                    if (this.map.has(name)) {
                        this.map.get(name).forEach(({ cb, ctx }) => {
                            cb.call(ctx, data);
                        });
                    }

                } catch (e) {
                    console.log(e);
                }
            }
        });
    }

    public callApi<T extends keyof IModule["api"]>(name: T, data: IModule["api"][T]["req"]): Promise<ICallApiRet<IModule["api"][T]["res"]>> {
        return new Promise((resolve) => {
            try {
                const timer = setInterval(() => {
                    resolve({ success: false, error: new Error("Time Out!") });
                    this.unListenMsg(name as any, cb, null);
                }, 5000);
                const cb = (res) => {
                    resolve(res);
                    clearInterval(timer);
                    this.unListenMsg(name as any, cb, null);
                }
                this.listenMsg(name as any, cb, null);
                this.sendMsg(name as any, data);
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
        if (this.map.has(name)) {
            this.map.get(name).push({ cb, ctx });
        } else {
            this.map.set(name, [{ cb, ctx }]);
        }
    }
    public unListenMsg<T extends keyof IModule["msg"]>(name: T, cb: (args: IModule["msg"][T]) => void, ctx: unknown) {
        if (this.map.has(name)) {
            const index = this.map.get(name).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(name).splice(index, 1);
        }
    }
}


interface IItem {
    cb: Function;
    ctx: unknown;
}


interface ICallApiRet<T> {
    success: boolean,
    res?: T,
    error?: Error,
}