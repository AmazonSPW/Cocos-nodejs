/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-12 19:19:40
 * @FilePath     : \client\assets\Scripts\Global\DataManager.ts
 * @Description  : 
 */
import { Prefab, SpriteFrame } from "cc";
import Singleton from "../Base/Singleton";
import { EntityTypeEnum, IActorMove, IState } from "../Common";
import { ActorMgr } from "../Entity/Actor/ActorMgr";
import { JoyStickMgr } from "../UI/JoyStickMgr";

export default class DataManager extends Singleton {
  public static get Instance() {
    return super.GetInstance<DataManager>();
  }

  public jm: JoyStickMgr;
  public actorMap: Map<number, ActorMgr> = new Map();
  public prefabMap: Map<string, Prefab> = new Map();
  public textureMap: Map<string, SpriteFrame[]> = new Map();

  state: IState = {
    actors: [{
      id: 1,
      type: EntityTypeEnum.Actor1,
      weaponType: EntityTypeEnum.Weapon1,
      position: {
        x: 0,
        y: 0,
      },
      direction: {
        x: 1,
        y: 0,
      }
    }]
  };

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