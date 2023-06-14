/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-13 17:23:56
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-14 13:25:00
 * @FilePath     : \client\assets\Scripts\Entity\Bullet\BulletMgr.ts
 * @Description  : 
 */
import { _decorator } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { EntityTypeEnum, IBullet, IVEC2 } from '../../Common';
import { EntityStateEnum, EventEnum } from '../../Enum';
import DataManager from '../../Global/DataManager';
import EventManager from '../../Global/EventManager';
import { ObjectPool } from '../../Global/ObjectPool';
import { ExplosionMgr } from '../Explosion/ExplosionMgr';
import { BulletStateMachine } from './BulletStateMachine';
const { ccclass, property } = _decorator;

@ccclass('BulletMgr')
export class BulletMgr extends EntityManager {
    public type: EntityTypeEnum;
    public id: number;

    public init(data: IBullet) {
        this.id = data.id;
        this.type = data.type;
        this.fsm = this.addComponent(BulletStateMachine);
        this.fsm.init(data.type);

        this.state = EntityStateEnum.Idle;

        EventManager.Instance.on(EventEnum.ExplosionBorn, this.handleExplosionBorn, this);
    }

    private handleExplosionBorn(id: number, { x, y }: IVEC2) {
        if (id !== this.id) return;

        let explosion = ObjectPool.Instance.get(EntityTypeEnum.Explosion);
        let em = explosion.getComponent(ExplosionMgr) || explosion.addComponent(ExplosionMgr);
        em.init(EntityTypeEnum.Explosion, { x, y });

        EventManager.Instance.off(EventEnum.ExplosionBorn, this.handleExplosionBorn, this);
        DataManager.Instance.bulletMap.delete(this.id);
        ObjectPool.Instance.ret(this.node);
    }

    public render(data: IBullet) {
        let { position, direction } = data;
        this.node.setPosition(position.x, position.y);

        let rad = Math.atan2(direction.y, direction.x);
        let angle = rad * 180 / Math.PI;

        this.node.setRotationFromEuler(0, 0, angle);
    }
}
