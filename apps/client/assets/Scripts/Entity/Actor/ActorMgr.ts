/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:04:16
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-12 21:20:02
 * @FilePath     : \client\assets\Scripts\Entity\Actor\ActorMgr.ts
 * @Description  : 
 */
import { _decorator, instantiate } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { EntityTypeEnum, IActor, InputTypeEnum } from '../../Common';
import { EntityStateEnum } from '../../Enum';
import DataManager from '../../Global/DataManager';
import { WeaponMgr } from '../Weapon/WeaponMgr';
import { ActorStateMachine } from './ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('ActorMgr')
export class ActorMgr extends EntityManager {
    private wm: WeaponMgr = null;

    public init(data: IActor) {
        this.fsm = this.addComponent(ActorStateMachine);
        this.fsm.init(data.type);

        this.state = EntityStateEnum.Idle;

        //添加武器
        const prefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Weapon1);
        const weapon = instantiate(prefab);
        weapon.setParent(this.node);
        this.wm = weapon.addComponent(WeaponMgr);
        this.wm.init(data);

    }

    public tick(dt: number): void {
        if (DataManager.Instance.jm.joyStickDir.lengthSqr() > 0) {
            const { x, y } = DataManager.Instance.jm.joyStickDir;
            DataManager.Instance.aplly({
                id: 1,
                type: InputTypeEnum.ActorMove,
                direction: {
                    x, y,
                },
                dt,
            });

            this.state = EntityStateEnum.Run;
        }
        else {
            this.state = EntityStateEnum.Idle;
        }
    }

    public render(data: IActor) {
        let { position, direction } = data;
        this.node.setPosition(position.x, position.y);


        //设置面向翻转
        if (direction.x != 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
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
}
