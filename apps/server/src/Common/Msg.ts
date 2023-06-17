/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 23:00:46
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 21:40:00
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Common\Msg.ts
 * @Description  : 
 */

import { IPlayer, IRoom } from "./Api";
import { IClientInput } from "./State";

export interface IMsgClientSync {
    input: IClientInput,
    frameId: number,
}

export interface IMsgServerSync {
    inputs: IClientInput[],
    lastFrameId: number,
}

export interface IMsgPlayerList {
    list: IPlayer[],
}

export interface IMsgRoomList {
    list: IRoom[],
}

export interface IMsgRoom {
    room: IRoom,
}