/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-12 20:02:15
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-14 00:00:49
 * @FilePath     : \client\assets\Scripts\Entity\Weapon\WeaponMgr.ts
 * @Description  : 
 */
import { _decorator, Node, UITransform, Vec2 } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { IActor, InputTypeEnum } from '../../Common';
import { EntityStateEnum, EventEnum } from '../../Enum';
import DataManager from '../../Global/DataManager';
import EventManager from '../../Global/EventManager';
import { WeaponStateMachine } from './WeaponStateMachine';
const { ccclass, property } = _decorator;

@ccclass('WeaponMgr')
export class WeaponMgr extends EntityManager {
    private owner: number
    private body: Node;
    private anchor: Node;
    private point: Node;
    public init(data: IActor) {
        this.owner = data.id;
        this.body = this.node.getChildByName("Body");
        this.anchor = this.body.getChildByName("Anchor");
        this.point = this.anchor.getChildByName("Point");

        this.fsm = this.body.addComponent(WeaponStateMachine);
        this.fsm.init(data.weaponType);

        this.state = EntityStateEnum.Idle;

        EventManager.Instance.on(EventEnum.WeaponShoot, this.handleWeaponShot, this);
        EventManager.Instance.on(EventEnum.BulletBorn, this.handleBulletBorn, this);

    }


    protected onDestroy(): void {
        EventManager.Instance.off(EventEnum.WeaponShoot, this.handleWeaponShot, this);
        EventManager.Instance.off(EventEnum.BulletBorn, this.handleBulletBorn, this);
    }

    private handleBulletBorn(owner: number) {
        if (owner !== this.owner) return;
        this.state = EntityStateEnum.Attack;
    }

    private handleWeaponShot() {
        let pointWorldPos = this.point.getWorldPosition();
        let pointStagePos = DataManager.Instance.stage.getComponent(UITransform).convertToNodeSpaceAR(pointWorldPos);
        let anchorWorldPos = this.anchor.getWorldPosition();

        let direction = new Vec2(pointWorldPos.x - anchorWorldPos.x, pointWorldPos.y - anchorWorldPos.y).normalize();


        DataManager.Instance.apllyInput({
            type: InputTypeEnum.WeaponShoot,
            owner: this.owner,
            direction: {
                x: direction.x,
                y: direction.y,
            },
            position: {
                x: pointStagePos.x,
                y: pointStagePos.y,
            }
        });

    }
}
