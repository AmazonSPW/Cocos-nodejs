/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-19 11:18:21
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Global\DataManager.ts
 * @Description  : 
 */
import { Node, Prefab, SpriteFrame, screen } from "cc";
import { Singleton } from "../Base/Singleton";
import { IBullet, IClientInput, IRoom, IState, InputTypeEnum, toFixed } from "../Common";
import { ActorMgr } from "../Entity/Actor/ActorMgr";
import { BulletMgr } from "../Entity/Bullet/BulletMgr";
import { EventEnum } from "../Enum";
import { JoyStickMgr } from "../UI/JoyStickMgr";
import EventManager from "./EventManager";

@Singleton()
export default class DataManager {
  public static Instance: DataManager;
  public curPlayerID: number = 1;
  public frameID: number = 1;
  public stage: Node;
  public jm: JoyStickMgr;
  public actorMap: Map<number, ActorMgr> = new Map();
  public bulletMap: Map<number, BulletMgr> = new Map();
  public prefabMap: Map<string, Prefab> = new Map();
  public textureMap: Map<string, SpriteFrame[]> = new Map();
  public roomInfo: IRoom;
  public lastState: IState;

  state: IState = {
    actors: [],
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
        actor.position.x += toFixed(ACTOR_SPEED * x * dt);
        actor.position.y += toFixed(ACTOR_SPEED * y * dt);
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

        EventManager.Instance.emit(EventEnum.BulletBorn, owner);

        this.state.bullets.push(bullet);
        break;

      case InputTypeEnum.TimePast:
        let { dt } = input;
        let { bullets, actors } = this.state;

        for (let i = bullets.length - 1; i >= 0; i--) {
          let bullet = bullets[i];

          //检测子弹是否击中玩家
          for (let j = actors.length - 1; j >= 0; j--) {
            let actor = actors[j];
            if (actor.id === bullet.owner) continue;
            let disSqr = (actor.position.x - bullet.position.x) ** 2 + (actor.position.y - bullet.position.y) ** 2;
            if (disSqr < (BULLET_RADIUS + ACTOR_RADIUS) ** 2) {
              EventManager.Instance.emit(EventEnum.ExplosionBorn, bullet.id, {
                x: bullet.position.x,
                y: bullet.position.y
              });
              bullets.splice(i, 1);
              actor.hp -= BULLET_DAMAGE;
              break;
            }
          }

          //检测子弹是否击中墙壁
          if (Math.abs(bullet.position.x) > screen.resolution.x / 2 || Math.abs(bullet.position.y) > screen.resolution.y / 2) {
            EventManager.Instance.emit(EventEnum.ExplosionBorn, bullet.id, {
              x: bullet.position.x,
              y: bullet.position.y
            });
            bullets.splice(i, 1);
          }
        }

        //刷新子弹的位置
        for (let bullet of bullets) {
          bullet.position.x += toFixed(bullet.direction.x * dt * BULLET_SPEED);
          bullet.position.y += toFixed(bullet.direction.y * dt * BULLET_SPEED);
        }
        break;

      default:
        break;
    }
  }
}


const ACTOR_SPEED = 100;
const BULLET_SPEED = 600;
const BULLET_RADIUS = 10;
const ACTOR_RADIUS = 50;
const BULLET_DAMAGE = 10;