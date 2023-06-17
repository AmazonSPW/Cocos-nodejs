/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-17 09:34:44
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 10:22:35
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Scene\HallMgr.ts
 * @Description  : 
 */
import { Component, Node, Prefab, _decorator, instantiate } from 'cc';
import { ApiMsgEnum, IApiPlayerListRes } from '../Common';
import { NetworkMgr } from '../Global/NetworkMgr';
import { PlayerMgr } from '../UI/PlayerMgr';
const { ccclass, property } = _decorator;

@ccclass('HallMgr')
export class HallMgr extends Component {
    @property(Node)
    public playerContainer: Node;

    @property(Prefab)
    public playerPrefab: Prefab;

    protected start(): void {
        this.getPlayers();
        this.playerContainer.removeAllChildren();
        NetworkMgr.Instance.listenMsg(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this);
    }

    protected onDestroy(): void {
        NetworkMgr.Instance.unListenMsg(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this);
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

}

