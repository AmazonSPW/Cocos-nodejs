/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-17 10:25:50
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 13:11:49
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Biz\Room.ts
 * @Description  : 
 */
import { ApiMsgEnum } from "../Common";
import { Player } from "./Player";
import { PlayerMgr } from "./PlayerMgr";
import { RoomMgr } from "./RoomMgr";

export class Room {
    public id: number;
    public players: Set<Player> = new Set();

    public constructor(rid: number) {
        this.id = rid;
    }

    public join(uid: number) {
        let player = PlayerMgr.Instance.idMapPlayer.get(uid);
        if (player) {
            player.rid = this.id;
            this.players.add(player);
        }
    }

    public leave(uid: number) {
        let player = PlayerMgr.Instance.idMapPlayer.get(uid);
        if (!player) return;
        player.rid = undefined;
        this.players.delete(player);
        if (this.players.size === 0) {
            RoomMgr.Instance.closeRoom(this.id);
        }
    }

    public sync() {
        for (let player of this.players) {
            player.connection.sendMsg(ApiMsgEnum.MsgRoom, {
                room: RoomMgr.Instance.getRoomView(this),
            });
        }
    }

    public close() {
        this.players.clear();
    }

}