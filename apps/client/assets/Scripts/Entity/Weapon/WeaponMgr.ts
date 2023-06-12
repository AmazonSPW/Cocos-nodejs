/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-12 20:02:15
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-12 20:27:38
 * @FilePath     : \client\assets\Scripts\Entity\Weapon\WeaponMgr.ts
 * @Description  : 
 */
import { _decorator, Node } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { IActor } from '../../Common';
import { EntityStateEnum } from '../../Enum';
import { WeaponStateMachine } from './WeaponStateMachine';
const { ccclass, property } = _decorator;

@ccclass('WeaponMgr')
export class WeaponMgr extends EntityManager {
    private body: Node;
    private anchor: Node;
    private point: Node;
    public init(data: IActor) {
        this.body = this.node.getChildByName("Body");
        this.anchor = this.body.getChildByName("Anchor");
        this.point = this.anchor.getChildByName("Point");

        this.fsm = this.addComponent(WeaponStateMachine);
        this.fsm.init(data.weaponType);

        this.state = EntityStateEnum.Idle;



    }
}
