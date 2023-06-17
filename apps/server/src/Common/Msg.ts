/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 23:00:46
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-16 23:02:06
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Common\Msg.ts
 * @Description  : 
 */

import { IClientInput } from "./State";

export interface IMsgClientSync {
    input: IClientInput,
    frameId: number,
}

export interface IMsgServerSync {
    inputs: IClientInput[],
    lastFrameId: number,
}