/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-13 17:23:56
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-13 23:03:51
 * @FilePath     : \client\assets\Scripts\Entity\Bullet\BulletMgr.ts
 * @Description  : 
 */
import { _decorator, instantiate } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { EntityTypeEnum, IBullet, IVEC2 } from '../../Common';
import { EntityStateEnum, EventEnum } from '../../Enum';
import DataManager from '../../Global/DataManager';
import EventManager from '../../Global/EventManager';
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

        let prefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Explosion);
        let explosion = instantiate(prefab);
        explosion.parent = DataManager.Instance.stage;
        let em = explosion.addComponent(ExplosionMgr);
        em.init(EntityTypeEnum.Explosion, { x, y });

        EventManager.Instance.off(EventEnum.ExplosionBorn, this.handleExplosionBorn, this);
        DataManager.Instance.bulletMap.delete(this.id);
        this.node.destroy();
    }

    public render(data: IBullet) {
        let { position, direction } = data;
        this.node.setPosition(position.x, position.y);

        let rad = Math.atan2(direction.y, direction.x);
        let angle = rad * 180 / Math.PI;

        this.node.setRotationFromEuler(0, 0, angle);
    }
}
