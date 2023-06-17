/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-17 11:37:34
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 11:39:50
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\UI\RoomMgr.ts
 * @Description  : 
 */
import { _decorator, Component, Label } from 'cc';
import { IRoom } from '../Common';
const { ccclass, property } = _decorator;

@ccclass('RoomMgr')
export class RoomMgr extends Component {
    public init({ id, players }: IRoom) {
        const label = this.getComponent(Label);
        label.string = `房间id: ${id}`;
        this.node.active = true;
    }
}
