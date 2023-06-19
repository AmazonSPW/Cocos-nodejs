/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:07:35
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-19 15:29:21
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Common\State.ts
 * @Description  : 
 */

import { EntityTypeEnum, InputTypeEnum } from "./Enum";


export interface IVEC2 {
    x: number,
    y: number,
}


export interface IActor {
    hp: number,
    id: number,
    position: IVEC2,
    direction: IVEC2,
    type: EntityTypeEnum,
    weaponType: EntityTypeEnum,
    bulletType: EntityTypeEnum,
}


export interface IBullet {
    id: number,
    owner: number,
    position: IVEC2,
    direction: IVEC2,
    type: EntityTypeEnum,
}

export interface IState {
    /**随机种子 */
    seed: number,
    actors: IActor[],
    bullets: IBullet[],
    nextBulletID: number,
}


export type IClientInput = IActorMove | IWeaponShoot | ITimePast;

export interface IActorMove {
    id: number,
    type: InputTypeEnum.ActorMove,
    direction: IVEC2,
    dt: number,
}

export interface IWeaponShoot {
    type: InputTypeEnum.WeaponShoot,
    owner: number,
    position: IVEC2,
    direction: IVEC2,
}

export interface ITimePast {
    type: InputTypeEnum.TimePast,
    dt: number,
}