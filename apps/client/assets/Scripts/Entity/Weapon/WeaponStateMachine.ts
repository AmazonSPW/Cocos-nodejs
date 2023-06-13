/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-12 20:13:12
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-14 00:00:08
 * @FilePath     : \client\assets\Scripts\Entity\Weapon\WeaponStateMachine.ts
 * @Description  : 
 */
import { _decorator, Animation, AnimationClip } from "cc";
import State from "../../Base/State";
import StateMachine, { getInitParamsTrigger } from "../../Base/StateMachine";
import { EntityTypeEnum } from "../../Common";
import { EntityStateEnum, ParamsNameEnum } from "../../Enum";
import { WeaponMgr } from "./WeaponMgr";
const { ccclass } = _decorator;

@ccclass("WeaponStateMachine")
export class WeaponStateMachine extends StateMachine {
    init(type: EntityTypeEnum) {
        this.type = type
        this.animationComponent = this.node.addComponent(Animation)

        this.initParams()
        this.initStateMachines()
        this.initAnimationEvent()
    }

    initParams() {
        this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger())
        this.params.set(ParamsNameEnum.Attack, getInitParamsTrigger())
    }

    initStateMachines() {
        this.stateMachines.set(ParamsNameEnum.Idle, new State(this, `${this.type}${EntityStateEnum.Idle}`))
        this.stateMachines.set(ParamsNameEnum.Attack, new State(this, `${this.type}${EntityStateEnum.Attack}`, AnimationClip.WrapMode.Normal, true))
    }

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, () => {
            if (this.animationComponent.defaultClip.name.includes(EntityStateEnum.Attack)) {
                this.node.parent.getComponent(WeaponMgr).state = EntityStateEnum.Idle;
            }
        })
    }

    run() {
        switch (this.currentState) {
            case this.stateMachines.get(ParamsNameEnum.Idle):
            case this.stateMachines.get(ParamsNameEnum.Attack):
                if (this.params.get(ParamsNameEnum.Attack).value) {
                    this.currentState = this.stateMachines.get(ParamsNameEnum.Attack)
                } if (this.params.get(ParamsNameEnum.Idle).value) {
                    this.currentState = this.stateMachines.get(ParamsNameEnum.Idle)
                } else {
                    this.currentState = this.currentState
                }
                break
            default:
                this.currentState = this.stateMachines.get(ParamsNameEnum.Idle)
                break
        }
    }
}
