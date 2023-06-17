/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-17 10:25:50
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 10:44:03
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Biz\Room.ts
 * @Description  : 
 */
import { Player } from "./Player";
import { PlayerMgr } from "./PlayerMgr";

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

}