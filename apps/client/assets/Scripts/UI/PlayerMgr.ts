/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-17 10:03:39
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 10:06:35
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\UI\PlayerMgr.ts
 * @Description  : 
 */
import { _decorator, Component, Label } from 'cc';
import { IPlayer } from '../Common';
const { ccclass, property } = _decorator;

@ccclass('PlayerMgr')
export class PlayerMgr extends Component {
    public init({ id, rid, nickname }: IPlayer) {
        const label = this.getComponent(Label);
        label.string = nickname;
        this.node.active = true;
    }
}

