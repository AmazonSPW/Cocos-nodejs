/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-13 22:54:11
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-14 13:21:03
 * @FilePath     : \client\assets\Scripts\Entity\Explosion\ExplosionStateMachine.ts
 * @Description  : 
 */
import { _decorator, Animation, AnimationClip } from "cc";
import State from "../../Base/State";
import StateMachine, { getInitParamsTrigger } from "../../Base/StateMachine";
import { EntityTypeEnum } from "../../Common";
import { EntityStateEnum, ParamsNameEnum } from "../../Enum";
import { ObjectPool } from "../../Global/ObjectPool";
const { ccclass } = _decorator;

@ccclass("ExplosionStateMachine")
export class ExplosionStateMachine extends StateMachine {
    init(type: EntityTypeEnum) {
        this.type = type;
        this.animationComponent = this.node.addComponent(Animation);
        this.initParams();
        this.initStateMachines();
        this.initAnimationEvent();
    }

    initParams() {
        this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger());
    }

    initStateMachines() {
        this.stateMachines.set(ParamsNameEnum.Idle, new State(this, `${this.type}${EntityStateEnum.Idle}`, AnimationClip.WrapMode.Normal));
    }

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, () => {
            ObjectPool.Instance.ret(this.node);
        });
    }

    run() {
        switch (this.currentState) {
            case this.stateMachines.get(ParamsNameEnum.Idle):
                if (this.params.get(ParamsNameEnum.Idle).value) {
                    this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
                } else {
                    this.currentState = this.currentState;
                }
                break;
            default:
                this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
                break;
        }
    }
}
