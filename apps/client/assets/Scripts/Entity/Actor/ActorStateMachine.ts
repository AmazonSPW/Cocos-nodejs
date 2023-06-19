/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-12 18:56:50
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-19 15:30:45
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Entity\Actor\ActorStateMachine.ts
 * @Description  : 
 */
import { _decorator, Animation, AnimationClip } from "cc";
import State from "../../Base/State";
import StateMachine, { getInitParamsTrigger } from "../../Base/StateMachine";
import { EntityTypeEnum } from "../../Common";
import { EntityStateEnum, ParamsNameEnum } from "../../Enum";
const { ccclass } = _decorator;

@ccclass("ActorStateMachine")
export class ActorStateMachine extends StateMachine {
    public init(type: EntityTypeEnum) {
        this.type = type;
        this.animationComponent = this.node.addComponent(Animation);
        this.initParams();
        this.initStateMachines();
        this.initAnimationEvent();
    }

    public initParams() {
        this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger());
        this.params.set(ParamsNameEnum.Run, getInitParamsTrigger());
    }

    public initStateMachines() {
        this.stateMachines.set(ParamsNameEnum.Idle, new State(this, `${this.type}${EntityStateEnum.Idle}`, AnimationClip.WrapMode.Loop));
        this.stateMachines.set(ParamsNameEnum.Run, new State(this, `${this.type}${EntityStateEnum.Run}`, AnimationClip.WrapMode.Loop));
    }

    public initAnimationEvent() { }

    public run() {
        switch (this.currentState) {
            case this.stateMachines.get(ParamsNameEnum.Idle):
            case this.stateMachines.get(ParamsNameEnum.Run):
                if (this.params.get(ParamsNameEnum.Run).value) {
                    this.currentState = this.stateMachines.get(ParamsNameEnum.Run);
                } else if (this.params.get(ParamsNameEnum.Idle).value) {
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
