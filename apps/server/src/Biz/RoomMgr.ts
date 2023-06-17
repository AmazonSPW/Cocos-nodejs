/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 11:56:48
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Biz\RoomMgr.ts
 * @Description  : 
 */

import { Singleton } from "../Base/Singleton";
import { ApiMsgEnum } from "../Common";
import { PlayerMgr } from "./PlayerMgr";
import { Room } from "./Room";

@Singleton()
export class RoomMgr {
    public static Instance: RoomMgr;

    private nextRoomID: number = 1;

    public rooms: Set<Room> = new Set();
    public idMapRoom: Map<number, Room> = new Map();
    public createRoom() {
        let room = new Room(this.nextRoomID++);
        this.rooms.add(room);
        this.idMapRoom.set(room.id, room);
        return room;
    }

    public joinRoom(rid: number, uid: number) {
        let room = this.idMapRoom.get(rid);
        if (room) {
            room.join(uid);
            return room;
        }
    }

    // public removePlayer(pID: number) {
    //     let player = this.idMapPlayer.get(pID);
    //     if (player) {
    //         this.players.delete(player);
    //         this.idMapPlayer.delete(pID);
    //     }
    // }

    /**
     * 转换前端界面所需要的信息
     * @param param0 
     */
    public getRoomView({ id, players }: Room) {
        return {
            id,
            players: PlayerMgr.Instance.getPlayersView(players),
        };
    }

    /**
     * 获取玩家列表给大厅
     * @param rooms 
     * @returns 
     */
    public getRoomsView(rooms: Set<Room> = this.rooms) {
        return [...rooms].map((r) => this.getRoomView(r));
    }


    /**
     * 当有一个玩家登录、退出游戏时
     * 更新所有客户端维护的玩家列表信息 
     */
    public syncRooms() {
        for (const player of PlayerMgr.Instance.players) {
            player.connection.sendMsg(ApiMsgEnum.MsgRoomList, {
                list: this.getRoomsView(),
            });
        }
    }

}