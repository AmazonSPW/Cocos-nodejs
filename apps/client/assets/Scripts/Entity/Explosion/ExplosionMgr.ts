/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-13 22:53:58
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-13 23:00:53
 * @FilePath     : \client\assets\Scripts\Entity\Explosion\ExplosionMgr.ts
 * @Description  : 
 */
import { _decorator } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { EntityTypeEnum, IVEC2 } from '../../Common';
import { EntityStateEnum } from '../../Enum';
import { ExplosionStateMachine } from './ExplosionStateMachine';
const { ccclass, property } = _decorator;

@ccclass('ExplosionMgr')
export class ExplosionMgr extends EntityManager {
    public type: EntityTypeEnum;
    public id: number;

    public init(type: EntityTypeEnum, { x, y }: IVEC2) {
        this.type = type;
        this.node.setPosition(x, y);
        this.fsm = this.addComponent(ExplosionStateMachine);
        this.fsm.init(type);

        this.state = EntityStateEnum.Idle;
    }
}
