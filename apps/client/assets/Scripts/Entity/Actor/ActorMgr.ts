/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:04:16
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-12 18:54:24
 * @FilePath     : \client\assets\Scripts\Entity\Actor\ActorMgr.ts
 * @Description  : 
 */
import { _decorator } from 'cc';
import { EntityManager } from '../../Base/EntityManager';
import { IActor, InputTypeEnum } from '../../Common';
import { EntityStateEnum } from '../../Enum';
import DataManager from '../../Global/DataManager';
import { ActorStateMachine } from './ActorStateMachine';
const { ccclass, property } = _decorator;

@ccclass('ActorMgr')
export class ActorMgr extends EntityManager {
    protected onLoad(): void {

    }

    public init(data: IActor) {
        this.fsm = this.addComponent(ActorStateMachine);
        this.fsm.init(data.type);

        this.state = EntityStateEnum.Idle;
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

        if (direction.x != 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
        }
    }
}
