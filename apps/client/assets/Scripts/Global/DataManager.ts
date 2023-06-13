/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-13 17:00:52
 * @FilePath     : \client\assets\Scripts\Global\DataManager.ts
 * @Description  : 
 */
import { Node, Prefab, SpriteFrame } from "cc";
import Singleton from "../Base/Singleton";
import { EntityTypeEnum, IBullet, IClientInput, IState, InputTypeEnum } from "../Common";
import { ActorMgr } from "../Entity/Actor/ActorMgr";
import { JoyStickMgr } from "../UI/JoyStickMgr";

export default class DataManager extends Singleton {
  public static get Instance() {
    return super.GetInstance<DataManager>();
  }

  public stage: Node;
  public jm: JoyStickMgr;
  public actorMap: Map<number, ActorMgr> = new Map();
  public prefabMap: Map<string, Prefab> = new Map();
  public textureMap: Map<string, SpriteFrame[]> = new Map();

  state: IState = {
    actors: [{
      id: 1,
      type: EntityTypeEnum.Actor1,
      weaponType: EntityTypeEnum.Weapon1,
      bulletType: EntityTypeEnum.Bullet1,
      position: {
        x: 0,
        y: 0,
      },
      direction: {
        x: 1,
        y: 0,
      }
    }],
    bullets: [],
    nextBulletID: 0
  };

  public apllyInput(input: IClientInput) {

    switch (input.type) {
      case InputTypeEnum.ActorMove: {
        let { id, direction: { x, y }, dt, } = input;
        let actor = this.state.actors.find(i => i.id === id);
        if (!actor) return;
        actor.direction.x = x;
        actor.direction.y = y;
        actor.position.x += SPEED * x * dt;
        actor.position.y += SPEED * y * dt;
      }
        break;

      case InputTypeEnum.WeaponShoot:
        let { owner, position, direction } = input;
        let bullet: IBullet = {
          id: this.state.nextBulletID++,
          owner,
          position,
          direction,
          type: this.actorMap.get(owner).bulletType,
        }

        this.state.bullets.push(bullet);
        break;

      default:
        break;


    }
  }
}


const SPEED = 100;