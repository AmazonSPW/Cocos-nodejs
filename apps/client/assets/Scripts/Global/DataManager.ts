/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-12 17:11:07
 * @FilePath     : \client\assets\Scripts\Global\DataManager.ts
 * @Description  : 
 */
import { Prefab } from "cc";
import Singleton from "../Base/Singleton";
import { EEntityType, IActorMove, IState } from "../Common";
import { ActorMgr } from "../Entity/Actor/ActorMgr";
import { JoyStickMgr } from "../UI/JoyStickMgr";

export default class DataManager extends Singleton {
  public textureMap: any;
  public static get Instance() {
    return super.GetInstance<DataManager>();
  }

  public jm: JoyStickMgr;
  public actorMap: Map<number, ActorMgr> = new Map();
  public prefabMap: Map<string, Prefab> = new Map();

  state: IState = {
    actors: [{
      id: 1,
      type: EEntityType.Actor1,
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
    let { id, direction: { x, y }, dt, } = input;

    let actor = this.state.actors.find(i => i.id === id);
    if (!actor) return;
    actor.direction.x = x;
    actor.direction.y = y;

    actor.position.x += SPEED * x * dt;
    actor.position.y += SPEED * y * dt;
  }
}


const SPEED = 100;