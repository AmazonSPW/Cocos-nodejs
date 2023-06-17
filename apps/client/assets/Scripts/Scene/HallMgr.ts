/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-17 09:34:44
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 11:56:01
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Scene\HallMgr.ts
 * @Description  : 
 */
import { Component, Node, Prefab, _decorator, director, instantiate } from 'cc';
import { ApiMsgEnum, IApiPlayerListRes, IApiRoomListRes } from '../Common';
import { SceneEnum } from '../Enum';
import DataManager from '../Global/DataManager';
import { NetworkMgr } from '../Global/NetworkMgr';
import { PlayerMgr } from '../UI/PlayerMgr';
import { RoomMgr } from '../UI/RoomMgr';
const { ccclass, property } = _decorator;

@ccclass('HallMgr')
export class HallMgr extends Component {
    @property(Node)
    public playerContainer: Node;

    @property(Prefab)
    public playerPrefab: Prefab;

    @property(Node)
    public roomContainer: Node;

    @property(Prefab)
    public roomPrefab: Prefab;


    protected onLoad(): void {
        NetworkMgr.Instance.listenMsg(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this);
        NetworkMgr.Instance.listenMsg(ApiMsgEnum.MsgRoomList, this.renderRoom, this);
    }

    protected start(): void {
        director.preloadScene(SceneEnum.Room);
        this.playerContainer.removeAllChildren();
        this.roomContainer.removeAllChildren();
        this.getPlayers();
        this.getRooms();
    }

    protected onDestroy(): void {
        NetworkMgr.Instance.unListenMsg(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this);
        NetworkMgr.Instance.unListenMsg(ApiMsgEnum.MsgRoomList, this.renderRoom, this);
    }

    public async getPlayers() {
        const { success, error, res } = await NetworkMgr.Instance.callApi(ApiMsgEnum.ApiPlayerList, {});
        if (!success) {
            console.log(`SWP log_____________ `, error);
            return
        }

        console.log(`SWP log_____________ hall `, res);
        this.renderPlayer(res);
    }

    private renderPlayer({ list }: IApiPlayerListRes) {
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


    public async handleCreateRoom() {
        const { success, error, res } = await NetworkMgr.Instance.callApi(ApiMsgEnum.ApiRoomCreate, {});
        if (!success) {
            console.log(`SWP log_____________ handleCreateRoom `, error);
            return
        }

        DataManager.Instance.roomInfo = res.room;
        console.log(`SWP log_____________ DataManager.Instance.roomInfo `, DataManager.Instance.roomInfo);
        director.loadScene(SceneEnum.Room);
    }

    /**
     * 获取房间
     * @returns 
     */
    public async getRooms() {
        const { success, error, res } = await NetworkMgr.Instance.callApi(ApiMsgEnum.ApiRoomList, {});
        if (!success) {
            console.log(`SWP log_____________ `, error);
            return
        }

        console.log(`SWP log_____________ hall `, res);
        this.renderRoom(res);
    }

    public renderRoom({ list }: IApiRoomListRes) {
        const children = this.roomContainer.children;
        for (const iterator of children) {
            iterator.active = false;
        }

        while (list.length > children.length) {
            let node = instantiate(this.roomPrefab);
            node.active = false;
            node.parent = this.roomContainer;
        }

        for (let i = 0; i < list.length; i++) {
            children[i].getComponent(RoomMgr).init(list[i]);
        }
    }

}

