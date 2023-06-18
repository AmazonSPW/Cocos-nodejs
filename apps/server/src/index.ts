/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 13:41:58
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\index.ts
 * @Description  : 
 */
import { PlayerMgr } from "./Biz/PlayerMgr";
import { RoomMgr } from "./Biz/RoomMgr";
import { ApiMsgEnum, IApiPlayerJoinReq, IApiPlayerJoinRes, IApiPlayerListReq, IApiPlayerListRes, IApiRoomCreateReq, IApiRoomCreateRes, IApiRoomJoinReq, IApiRoomJoinRes, IApiRoomLeaveReq, IApiRoomLeaveRes, IApiRoomListReq, IApiRoomListRes } from "./Common";
import { Connection } from "./Core";
import { MyServer } from "./Core/MyServer";
import { symlinkCommon } from "./Utils";

declare module "./Core" {
    interface Connection {
        playerID: number;
    }
}

symlinkCommon();


let server = new MyServer({
    port: 9876
});

server.on("connection", (connction: Connection) => {
    console.log(`SWP log_____________ 来人了 size: ${server.connectons.size}`);
});

server.on("disconnection", (connction: Connection) => {
    console.log(`SWP log_____________ 走人了 size: ${server.connectons.size}`);
    if (connction.playerID) {
        PlayerMgr.Instance.removePlayer(connction.playerID);
    }
    PlayerMgr.Instance.syncPlayers();
});


//玩家登录时候的回调
server.setApi(ApiMsgEnum.ApiPlayerJoin, (connection: Connection, data: IApiPlayerJoinReq): IApiPlayerJoinRes => {

    const { nickname } = data;
    const player = PlayerMgr.Instance.createPlayer({ nickname, connection });
    connection.playerID = player.id;
    PlayerMgr.Instance.syncPlayers();
    return {
        player: PlayerMgr.Instance.getPlayerView(player),
    };
});


//玩家主动请求获取大厅信息
server.setApi(ApiMsgEnum.ApiPlayerList, (connection: Connection, data: IApiPlayerListReq): IApiPlayerListRes => {
    return {
        list: PlayerMgr.Instance.getPlayersView(),
    };
});

//创建房间
server.setApi(ApiMsgEnum.ApiRoomCreate, (connection: Connection, data: IApiRoomCreateReq): IApiRoomCreateRes => {

    if (connection.playerID) {
        const newRoom = RoomMgr.Instance.createRoom();
        const room = RoomMgr.Instance.joinRoom(newRoom.id, connection.playerID);
        if (room) {
            PlayerMgr.Instance.syncPlayers();
            RoomMgr.Instance.syncRooms();
            return {
                room: RoomMgr.Instance.getRoomView(room)
            }
        } else {
            throw new Error("房间不存在！");
        }

    } else {
        throw new Error("未登录");
    }
});

//获取房间列表
server.setApi(ApiMsgEnum.ApiRoomList, (connection: Connection, data: IApiRoomListReq): IApiRoomListRes => {
    return {
        list: RoomMgr.Instance.getRoomsView(),
    };
});

//创建房间
server.setApi(ApiMsgEnum.ApiRoomJoin, (connection: Connection, { rid }: IApiRoomJoinReq): IApiRoomJoinRes => {

    if (connection.playerID) {
        const room = RoomMgr.Instance.joinRoom(rid, connection.playerID);
        if (room) {
            PlayerMgr.Instance.syncPlayers();
            RoomMgr.Instance.syncRooms();
            RoomMgr.Instance.syncRoom(room.id);
            return {
                room: RoomMgr.Instance.getRoomView(room)
            }
        } else {
            throw new Error("房间不存在！");
        }

    } else {
        throw new Error("未登录");
    }
});

//退出房间
server.setApi(ApiMsgEnum.ApiRoomLeave, (connection: Connection, { }: IApiRoomLeaveReq): IApiRoomLeaveRes => {

    if (!connection.playerID) throw new Error("未登录");
    let player = PlayerMgr.Instance.idMapPlayer.get(connection.playerID);
    if (!player) throw new Error("玩家不存在!");
    let { rid, id } = player;
    if (!rid) throw new Error("玩家不在房间里！");
    RoomMgr.Instance.leaveRoom(rid, id);
    PlayerMgr.Instance.syncPlayers();
    RoomMgr.Instance.syncRooms();
    RoomMgr.Instance.syncRoom(rid);
    console.log(`SWP log_____________ ApiRoomLeave 房间数量 `, RoomMgr.Instance.idMapRoom.size);
    return {};
});

server
    .start()
    .then();
