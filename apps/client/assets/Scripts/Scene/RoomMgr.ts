/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-17 09:34:44
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 14:26:34
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Scene\RoomMgr.ts
 * @Description  : 
 */
import { Component, Node, Prefab, _decorator, director, instantiate } from 'cc';
import { ApiMsgEnum, IMsgGameStart, IMsgRoom } from '../Common';
import { SceneEnum } from '../Enum';
import DataManager from '../Global/DataManager';
import { NetworkMgr } from '../Global/NetworkMgr';
import { PlayerMgr } from '../UI/PlayerMgr';
const { ccclass, property } = _decorator;

@ccclass('RoomMgr')
export class RoomMgr extends Component {
    @property(Node)
    public playerContainer: Node;

    @property(Prefab)
    public playerPrefab: Prefab;


    protected onLoad(): void {
        NetworkMgr.Instance.listenMsg(ApiMsgEnum.MsgRoom, this.renderPlayer, this);
        NetworkMgr.Instance.listenMsg(ApiMsgEnum.MsgGameStart, this.handleGameStart, this);
    }

    protected start(): void {
        this.renderPlayer({
            room: DataManager.Instance.roomInfo,
        });
    }

    protected onDestroy(): void {
        NetworkMgr.Instance.unListenMsg(ApiMsgEnum.MsgGameStart, this.handleGameStart, this);
        NetworkMgr.Instance.unListenMsg(ApiMsgEnum.MsgRoom, this.renderPlayer, this);
    }


    private renderPlayer({ room: { players: list } }: IMsgRoom) {
        const children = this.playerContainer.children;
        for (const iterator of children) {
            iterator.active = false;
        }

        while (list.length > children.length) {
            let node = instantiate(this.playerPrefab);
            node.active = false;
            node.parent = this.playerContainer;
        }

        for (let i = 0; i < list.length; i++) {
            children[i].getComponent(PlayerMgr).init(list[i]);
        }
    }


    public async handleLeaveRoom() {
        const { success, error, res } = await NetworkMgr.Instance.callApi(ApiMsgEnum.ApiRoomLeave, {});
        if (!success) {
            console.log(`SWP log_____________ handleCreateRoom `, error);
            return
        }

        DataManager.Instance.roomInfo = undefined;
        console.log(`SWP log_____________ DataManager.Instance.roomInfo `, DataManager.Instance.roomInfo);
        director.loadScene(SceneEnum.Hall);
    }

    public async handleStart() {
        const { success, error, res } = await NetworkMgr.Instance.callApi(ApiMsgEnum.ApiGameStart, {});
        if (!success) {
            console.log(`SWP log_____________ handleCreateRoom `, error);
            return
        }
    }

    private handleGameStart({ state }: IMsgGameStart) {
        DataManager.Instance.state = state;
        director.loadScene(SceneEnum.Battle);
    }


}

