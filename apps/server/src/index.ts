/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 11:58:06
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\index.ts
 * @Description  : 
 */
import { PlayerMgr } from "./Biz/PlayerMgr";
import { RoomMgr } from "./Biz/RoomMgr";
import { ApiMsgEnum, IApiPlayerJoinReq, IApiPlayerJoinRes, IApiPlayerListReq, IApiPlayerListRes, IApiRoomCreateReq, IApiRoomCreateRes, IApiRoomListReq, IApiRoomListRes } from "./Common";
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

    console.log(`SWP log_____________ 玩家列表的数值 PlayerMgr.Instance.players.size: ${PlayerMgr.Instance.players.size}`);
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


server
    .start()
    .then();
