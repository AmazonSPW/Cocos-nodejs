/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 16:52:49
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 09:08:15
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Scene\LoginMgr.ts
 * @Description  : 
 */
import { _decorator, Component, director, EditBox } from 'cc';
import { ApiMsgEnum } from '../Common';
import { SceneEnum } from '../Enum';
import DataManager from '../Global/DataManager';
import { NetworkMgr } from '../Global/NetworkMgr';
const { ccclass, property } = _decorator;

@ccclass('LoginMgr')
export class LoginMgr extends Component {
    private input: EditBox;
    protected onLoad(): void {
        this.input = this.getComponentInChildren(EditBox);
        director.preloadScene(SceneEnum.Battle);
    }

    protected async start(): Promise<void> {
        await NetworkMgr.Instance.connect();
    }

    public async handleClick() {
        if (!NetworkMgr.Instance.isConnected) {
            console.log(`SWP log_____________ ${"未连接"}`);
            await NetworkMgr.Instance.connect();
            return;
        }

        const nickname = this.input.string;
        if (!nickname) {
            console.log(`SWP log_____________ ${"nickname没有！！！"}`);
            return;
        }

        const { success, error, res } = await NetworkMgr.Instance.callApi(ApiMsgEnum.ApiPlayerJoin, {
            nickname,
        });
        if (!success) {
            console.log(`SWP log_____________ `, error);
            return
        }

        DataManager.Instance.curPlayerID = res.player.id;
        director.loadScene(SceneEnum.Battle);
        console.log(`SWP log_____________ 登录成功\n `, res);
    }

}

