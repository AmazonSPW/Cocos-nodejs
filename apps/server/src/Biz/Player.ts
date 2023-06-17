/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 16:26:38
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 08:58:46
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Biz\Player.ts
 * @Description  : 
 */

import { Connection } from "../Core";

export class Player {
    public id: number;
    public nickname: string;
    public connection: Connection;
    public rid: number;

    constructor({ id, nickname, connection }: Pick<Player, "id" | "connection" | "nickname">) {
        this.id = id;
        this.nickname = nickname;
        this.connection = connection;
    }

}