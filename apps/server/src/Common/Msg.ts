/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 23:00:46
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 14:17:14
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Common\Msg.ts
 * @Description  : 
 */

import { IPlayer, IRoom } from "./Api";
import { IClientInput, IState } from "./State";

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

export interface IMsgGameStart {
    state: IState,
}