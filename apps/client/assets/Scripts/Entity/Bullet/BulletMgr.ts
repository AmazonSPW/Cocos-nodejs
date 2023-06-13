/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-13 17:23:56
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-13 17:45:19
 * @FilePath     : \client\assets\Scripts\Entity\Bullet\BulletMgr.ts
 * @Description  : 
 */
import { _decorator } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { EntityTypeEnum, IBullet } from '../../Common';
import { EntityStateEnum } from '../../Enum';
import { BulletStateMachine } from './BulletStateMachine';
const { ccclass, property } = _decorator;

@ccclass('BulletMgr')
export class BulletMgr extends EntityManager {
    public type: EntityTypeEnum;

    public init(data: IBullet) {
        this.type = data.type;
        this.fsm = this.addComponent(BulletStateMachine);
        this.fsm.init(data.type);

        this.state = EntityStateEnum.Idle;
    }

    public render(data: IBullet) {
        let { position, direction } = data;
        this.node.setPosition(position.x, position.y);

        let rad = Math.atan2(direction.y, direction.x);
        let angle = rad * 180 / Math.PI;

        this.node.setRotationFromEuler(0, 0, angle);
    }
}
