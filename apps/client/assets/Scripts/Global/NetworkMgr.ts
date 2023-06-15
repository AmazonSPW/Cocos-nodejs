/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-14 14:37:43
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-15 18:12:25
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Global\NetworkMgr.ts
 * @Description  : 
 */
import { Singleton } from "../Base/Singleton";

@Singleton()
export class NetworkMgr {
    public static Instance: NetworkMgr;

    private port = 9876;
    private ws: WebSocket;

    private map: Map<string, Array<IItem>> = new Map();

    public connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(`ws://localhost:${this.port}`);
            this.ws.onopen = () => {
                resolve(true);
            }

            this.ws.onclose = () => {
                reject(false);
            }

            this.ws.onerror = (e) => {
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

    public sendMsg(name: string, data) {
        let msg = { name, data };
        this.ws.send(JSON.stringify(msg));
    }

    public listenMsg(name: string, cb: Function, ctx: unknown) {
        if (this.map.has(name)) {
            this.map.get(name).push({ cb, ctx });
        } else {
            this.map.set(name, [{ cb, ctx }]);
        }
    }
}


interface IItem {
    cb: Function;
    ctx: unknown;
}