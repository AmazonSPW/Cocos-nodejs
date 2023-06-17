/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-17 11:37:34
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 22:19:36
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\UI\RoomMgr.ts
 * @Description  : 
 */
import { _decorator, Component, Label } from 'cc';
import { IRoom } from '../Common';
import { EventEnum } from '../Enum';
import EventManager from '../Global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('RoomMgr')
export class RoomMgr extends Component {
    private id: number;
    public init({ id, players }: IRoom) {
        this.id = id;
        const label = this.getComponent(Label);
        label.string = `房间id: ${id}`;
        this.node.active = true;
    }

    public handleClick() {
        EventManager.Instance.emit(EventEnum.RoomJion, this.id);
        console.log(`SWP log_____________ 点击ruji`,);
    }
}
