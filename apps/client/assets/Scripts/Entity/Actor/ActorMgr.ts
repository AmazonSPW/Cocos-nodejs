/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:04:16
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-19 11:01:45
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Entity\Actor\ActorMgr.ts
 * @Description  : 
 */
import { ProgressBar, Tween, Vec3, _decorator, instantiate, tween } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { EntityTypeEnum, IActor, InputTypeEnum, toFixed } from '../../Common';
import { EntityStateEnum, EventEnum } from '../../Enum';
import DataManager from '../../Global/DataManager';
import EventManager from '../../Global/EventManager';
import { WeaponMgr } from '../Weapon/WeaponMgr';
import { ActorStateMachine } from './ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('ActorMgr')
export class ActorMgr extends EntityManager {
    private wm: WeaponMgr = null;
    public bulletType: EntityTypeEnum;
    public id: number;

    public hp: ProgressBar;
    private targetPos: Vec3;
    private tw: Tween<unknown>;

    public init(data: IActor) {
        this.id = data.id;
        this.bulletType = data.bulletType;
        this.fsm = this.addComponent(ActorStateMachine);
        this.fsm.init(data.type);

        this.state = EntityStateEnum.Idle;
        this.hp = this.node.getComponentInChildren(ProgressBar);

        this.node.active = false;
        this.targetPos = undefined;

        //添加武器
        const prefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Weapon1);
        const weapon = instantiate(prefab);
        weapon.setParent(this.node);
        this.wm = weapon.addComponent(WeaponMgr);
        this.wm.init(data);

    }

    public tick(dt: number): void {
        if (this.id != DataManager.Instance.curPlayerID) return;
        if (DataManager.Instance.jm.joyStickDir.lengthSqr() == 0) return;

        const { x, y } = DataManager.Instance.jm.joyStickDir;
        EventManager.Instance.emit(EventEnum.ClientSync, {
            id: DataManager.Instance.curPlayerID,
            type: InputTypeEnum.ActorMove,
            direction: {
                x: toFixed(x),
                y: toFixed(y),
            },
            dt: toFixed(dt),
        });
    }

    public render(data: IActor) {
        this.renderPos(data);
        this.renderDir(data);
        this.renderHp(data);
    }


    private renderPos(data: IActor) {
        let { position, direction } = data;
        const newPos = new Vec3(position.x, position.y);
        if (!this.targetPos) {
            this.node.active = true;
            this.node.setPosition(newPos);
            this.targetPos = new Vec3(newPos);
        } else if (!this.targetPos.equals(newPos)) {
            this.tw?.stop();
            this.state = EntityStateEnum.Run;
            this.node.setPosition(this.targetPos);
            this.targetPos.set(newPos);
            this.tw = tween(this.node)
                .to(0.1, {
                    position: this.targetPos,
                })
                .call(() => {
                    this.state = EntityStateEnum.Idle;
                })
                .start();
        }
    }
    private renderDir(data: IActor) {
        let { position, direction } = data;
        //设置面向翻转
        if (direction.x != 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
            this.hp.node.setScale(direction.x > 0 ? 1 : -1, 1);
        }


        //设置枪的方向
        let x = direction.x;
        if (this.node.scale.x == -1) {
            x *= -1;
        }
        let rad = Math.atan2(direction.y, x);
        let angle = rad * 180 / Math.PI;
        this.wm.node.setRotationFromEuler(0, 0, angle);
    }
    private renderHp(data: IActor) {
        this.hp.progress = data.hp / this.hp.totalLength;
    }
}
