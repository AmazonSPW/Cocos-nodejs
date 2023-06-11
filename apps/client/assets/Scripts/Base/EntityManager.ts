/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-11 20:00:32
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Base\EntityManager.ts
 * @Description  : 
 */
import { _decorator, Component } from "cc";
import { EntityStateEnum } from "../Enum";
import StateMachine from "./StateMachine";
const { ccclass, property } = _decorator;

@ccclass("EntityManager")
export abstract class EntityManager extends Component {
  fsm: StateMachine;
  private _state: EntityStateEnum;

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
    this.fsm.setParams(newState, true);
  }

  abstract init(...args: any[]): void;
}
