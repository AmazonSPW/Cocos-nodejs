/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 16:26:38
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-16 16:29:31
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Biz\Player.ts
 * @Description  : 
 */

import { Connection } from "../Core";

export class Player {
    id: number;
    nickname: string;
    connction: Connection;
    rid: number;

    constructor({ id, nickname, connction }: Pick<Player, "id" | "connction" | "nickname">) {
        this.id = id;
        this.nickname = nickname;
        this.connction = connction;
    }

}