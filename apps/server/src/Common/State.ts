/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:07:35
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-11 22:37:01
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Common\State.ts
 * @Description  : 
 */

import { InputTypeEnum } from "./Enum";


export interface IVEC2 {
    x: number;
    y: number;
}


export interface IActor {
    id: number;
    position: IVEC2;
    direction: IVEC2;
}

export interface IState {
    actors: IActor[]
}

export interface IActorMove {
    id: number,
    type: InputTypeEnum,
    direction: IVEC2,
    dt: number,
}