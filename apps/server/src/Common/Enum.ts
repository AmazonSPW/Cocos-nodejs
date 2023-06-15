/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:33:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-15 20:12:43
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
    /**客户端消息同步 */
    MsgClientSync = "MsgClientSync",
    /**服务端消息同步 */
    MsgServerSync = "MsgServiceSync",
    /**玩家请求加入游戏 */
    ApiPlayerJoin = "ApiPlayerJoin",

}