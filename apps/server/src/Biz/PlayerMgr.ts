/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 13:46:27
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Biz\PlayerMgr.ts
 * @Description  : 
 */

import { Singleton } from "../Base/Singleton";
import { ApiMsgEnum, IApiPlayerJoinReq } from "../Common";
import { Connection } from "../Core";
import { Player } from "./Player";
import { RoomMgr } from "./RoomMgr";

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
            if (player.rid) {
                RoomMgr.Instance.leaveRoom(player.rid, pID);
                RoomMgr.Instance.syncRooms();
                RoomMgr.Instance.syncRoom(player.rid);
            }
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

    /**
     * 获取玩家列表给大厅
     * @param players 
     * @returns 
     */
    public getPlayersView(players: Set<Player> = this.players) {
        return [...players].map((p) => this.getPlayerView(p));
    }


    /**
     * 当有一个玩家登录、退出游戏时
     * 更新所有客户端维护的玩家列表信息 
     */
    public syncPlayers() {
        for (const player of this.players) {
            player.connection.sendMsg(ApiMsgEnum.MsgPlayerList, {
                list: this.getPlayersView(),
            });
        }
    }

}