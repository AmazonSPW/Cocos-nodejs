import { PlayerMgr } from "./Biz/PlayerMgr";
import { ApiMsgEnum } from "./Common";
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

    console.log(`SWP log_____________ 玩家列表的数值 PlayerMgr.Instance.players.size: ${PlayerMgr.Instance.players.size}`);
});

server.setApi(ApiMsgEnum.ApiPlayerJoin, (connection: Connection, data: any) => {

    const { nickname } = data;
    const player = PlayerMgr.Instance.createPlayer({ nickname, connection });
    connection.playerID = player.id;
    return {
        player: PlayerMgr.Instance.getPlayerView(player),
    };
});

server.start().then();
