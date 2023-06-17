/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 22:52:02
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 10:52:24
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Common\Api.ts
 * @Description  : 
 */

export interface IPlayer {
    id: number;
    nickname: string;
    rid: number;
}

export interface IRoom {
    id: number;
    players: IPlayer[];
}

export interface IApiPlayerJoinReq {
    nickname: string,
}

export interface IApiPlayerJoinRes {
    player: IPlayer,
}

export interface IApiPlayerListReq { }

export interface IApiPlayerListRes {
    list: IPlayer[],
}

export interface IApiRoomCreateReq { }

export interface IApiRoomCreateRes {
    room: IRoom,
}