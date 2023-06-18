/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:33:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 14:16:13
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Common\Enum.ts
 * @Description  : 
 */

export enum InputTypeEnum {
    ActorMove = "ActorMove",
    WeaponShoot = "WeaponShoot",
    /**时间流逝 */
    TimePast = "TimePast",
}

/**
 * 实体类型
 */

export enum EntityTypeEnum {
    Actor1 = "Actor1",
    Map = "Map",
    Weapon1 = "Weapon1",
    Bullet1 = "Bullet1",
    Bullet2 = "Bullet2",
    Explosion = "Explosion"
}

export enum ApiMsgEnum {
    /**消息客户端消息同步 */
    MsgClientSync = "MsgClientSync",
    /**消息服务端消息同步 */
    MsgServerSync = "MsgServiceSync",
    /**消息同步玩家列表 */
    MsgPlayerList = "MsgPlayerList",
    /**房间数量同步 */
    MsgRoomList = "MsgRoomList",
    /**房间内消息同步 */
    MsgRoom = "MsgRoom",
    /**开始游戏信息 */
    MsgGameStart = "msgGameStart",

    /**玩家请求加入游戏 */
    ApiPlayerJoin = "ApiPlayerJoin",
    /**获取玩家列表 */
    ApiPlayerList = "ApiPlayerList",
    /**创建房间 */
    ApiRoomCreate = "ApiRoomCreate",
    /**获取房间列表 */
    ApiRoomList = "ApiRoomList",
    /**加入房间 */
    ApiRoomJoin = "ApiRoomJoin",
    /**离开房间 */
    ApiRoomLeave = "ApiRoomLeave",
    ApiGameStart = "ApiGameStart",


}