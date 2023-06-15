/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:33:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-15 18:10:57
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Common\Enum.ts
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

export enum ApiMsgEunm {
    /**同步客户端 */
    MgsClientSync = "MgsClientSync",
    /**同步服务器 */
    MgsServerSync = "MgsServerSync",
}