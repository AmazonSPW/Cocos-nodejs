/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 12:57:24
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

    public closeRoom(rid: number) {
        let room = this.idMapRoom.get(rid);
        if (!room) return;
        room.close();
        this.rooms.delete(room);
        this.idMapRoom.delete(room.id);
    }

    public joinRoom(rid: number, uid: number) {
        let room = this.idMapRoom.get(rid);
        if (room) {
            room.join(uid);
            return room;
        }
    }

    public leaveRoom(rid: number, uid: number) {
        let room = this.idMapRoom.get(rid);
        if (room) {
            room.leave(uid);
            // this.rooms.delete(room);
            // this.idMapRoom.delete(rid);
        }
    }

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
     * 更新所有客户端维护的   $￥￥房间￥￥$    列表信息 
     */
    public syncRooms() {
        for (const player of PlayerMgr.Instance.players) {
            player.connection.sendMsg(ApiMsgEnum.MsgRoomList, {
                list: this.getRoomsView(),
            });
        }
    }


    /**
     * 同步房间内的所有玩家信息，
     * 让房间内其他玩家知道有新玩家加入
     * @param rid 
     */
    public syncRoom(rid: number) {
        let room = this.idMapRoom.get(rid);
        if (room) {
            room.sync();
        }
    }

}