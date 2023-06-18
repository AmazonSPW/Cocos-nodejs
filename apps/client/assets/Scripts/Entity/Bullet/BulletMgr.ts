/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-13 17:23:56
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 16:35:10
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Entity\Bullet\BulletMgr.ts
 * @Description  : 
 */
import { Tween, Vec3, _decorator, tween } from 'cc';
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
    private targetPos: Vec3;
    private tw: Tween<unknown>;

    public init(data: IBullet) {
        this.id = data.id;
        this.type = data.type;
        this.fsm = this.addComponent(BulletStateMachine);
        this.fsm.init(data.type);

        this.state = EntityStateEnum.Idle;
        this.node.active = false;
        this.targetPos = undefined;

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
        this.renderPos(data);
        this.renderDir(data);
    }

    private renderPos(data: IBullet) {
        let { position, direction } = data;
        const newPos = new Vec3(position.x, position.y);
        if (!this.targetPos) {
            this.node.active = true;
            this.node.setPosition(newPos);
            this.targetPos = new Vec3(newPos);
        } else if (!this.targetPos.equals(newPos)) {
            this.tw?.stop();
            this.node.setPosition(this.targetPos);
            this.targetPos.set(newPos);
            this.tw = tween(this.node)
                .to(0.1, {
                    position: this.targetPos,
                })
                .start();
        }
    }
    private renderDir(data: IBullet) {
        let { position, direction } = data;

        let rad = Math.atan2(direction.y, direction.x);
        let angle = rad * 180 / Math.PI;

        this.node.setRotationFromEuler(0, 0, angle);
    }
}
