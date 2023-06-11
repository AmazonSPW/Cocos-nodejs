/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-11 23:07:24
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Global\DataManager.ts
 * @Description  : 
 */
import Singleton from "../Base/Singleton";
import { IActorMove, IState } from "../Common";
import { JoyStickMgr } from "../UI/JoyStickMgr";

export default class DataManager extends Singleton {
  textureMap: any;
  static get Instance() {
    return super.GetInstance<DataManager>();
  }

  jm: JoyStickMgr;

  state: IState = {
    actors: [{
      id: 1,
      position: {
        x: 0,
        y: 0,
      },
      direction: {
        x: 1,
        y: 0,
      }
    }]
  }

  public aplly(input: IActorMove) {
    let { id, type, direction: { x, y }, dt, } = input;

    let actor = this.state.actors.find(i => i.id === id);
    if (!actor) return;
    actor.direction.x = x;
    actor.direction.y = y;

    actor.position.x += SPEED * x * dt;
    actor.position.y += SPEED * y * dt;
  }
}


const SPEED = 100;