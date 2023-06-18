/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-17 10:25:50
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 14:43:21
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Biz\Room.ts
 * @Description  : 
 */
import { ApiMsgEnum, EntityTypeEnum, IClientInput, IMsgClientSync, IState } from "../Common";
import { Connection } from "../Core";
import { Player } from "./Player";
import { PlayerMgr } from "./PlayerMgr";
import { RoomMgr } from "./RoomMgr";

export class Room {
    public id: number;
    public players: Set<Player> = new Set();

    /**挂起输入 */
    private pendingInput: IClientInput[] = [];

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

    public start() {

        const state: IState = {
            actors: [...this.players].map((player, index) => ({
                id: player.id,
                nickname: player.nickname,
                type: EntityTypeEnum.Actor1,
                weaponType: EntityTypeEnum.Weapon1,
                bulletType: EntityTypeEnum.Bullet2,
                hp: 100,
                position: {
                    x: -150 + index * 300,
                    y: -150 + index * 300,
                },
                direction: {
                    x: 1,
                    y: 0,
                },
            })),
            bullets: [],
            nextBulletID: 0
        };

        for (let player of this.players) {
            player.connection.sendMsg(ApiMsgEnum.MsgGameStart, {
                state,
            });

            player.connection.listenMsg(ApiMsgEnum.MsgClientSync, this.getClientSync, this);
        }

        const timer1 = setInterval(() => {
            this.sendServerMsg();
        }, 100);
    }

    private getClientSync(connection: Connection, { input, frameId }: IMsgClientSync) {
        this.pendingInput.push(input);
    }

    private sendServerMsg() {
        const inputs = this.pendingInput;
        this.pendingInput = [];

        for (let player of this.players) {
            player.connection.sendMsg(ApiMsgEnum.MsgServerSync, {
                lastFrameId: 0,
                inputs,
            });
        }
    }

}