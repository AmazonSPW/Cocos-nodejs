/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 22:52:02
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-16 22:53:06
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Common\Api.ts
 * @Description  : 
 */

interface IPlayer {
    id: number;
    nickname: string;
    rid: number;
}

export interface IApiPlayerJoinReq {
    nickname: string,
}

export interface IApiPlayerJoinRes {
    player: IPlayer,
}