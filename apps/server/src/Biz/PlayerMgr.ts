/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 08:56:49
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Biz\PlayerMgr.ts
 * @Description  : 
 */

import { Singleton } from "../Base/Singleton";
import { IApiPlayerJoinReq } from "../Common";
import { Connection } from "../Core";
import { Player } from "./Player";

@Singleton()
export class PlayerMgr {
    public static Instance: PlayerMgr;

    private nextPlayerID: number = 1;

    public players: Set<Player> = new Set();
    public idMapPlayer: Map<number, Player> = new Map();
    public createPlayer({ nickname, connection }: IApiPlayerJoinReq & { connection: Connection }) {
        const player = new Player({ id: this.nextPlayerID++, nickname, connection });
        this.players.add(player);
        this.idMapPlayer.set(player.id, player);
        return player;
    }

    public removePlayer(pID: number) {
        let player = this.idMapPlayer.get(pID);
        if (player) {
            this.players.delete(player);
            this.idMapPlayer.delete(pID);
        }
    }

    /**
     * 转换前端界面所需要的信息
     * @param param0 
     */
    public getPlayerView({ id, nickname, rid }: Player) {
        return {
            id,
            nickname,
            rid,
        };
    }

}