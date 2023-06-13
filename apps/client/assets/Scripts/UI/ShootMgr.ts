/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-13 16:10:02
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-13 16:15:30
 * @FilePath     : \client\assets\Scripts\UI\ShootMgr.ts
 * @Description  : 
 */
import { _decorator, Component } from 'cc';
import { EventEnum } from '../Enum';
import EventManager from '../Global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('ShootMgr')
export class ShootMgr extends Component {
    public handleShoot() {
        EventManager.Instance.emit(EventEnum.WeaponShoot);
    }
}