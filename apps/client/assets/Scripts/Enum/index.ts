/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-12 19:55:09
 * @FilePath     : \client\assets\Scripts\Enum\index.ts
 * @Description  : 
 */
export enum FsmParamTypeEnum {
  Number = "Number",
  Trigger = "Trigger",
}

export enum ParamsNameEnum {
  Idle = "Idle",
  Run = "Run",
  Attack = "Attack",
}

export enum EventEnum { }


export enum EntityStateEnum {
  Idle = "Idle",
  Run = "Run",
  Attack = "Attack",
}

export enum EPrefabPath {
  Actor1 = "prefab/Actor",
  Map = "prefab/Map",
  Weapon1 = "prefab/Weapon1",
}

export enum ETexTurePath {
  Actor1Idle = "texture/actor/actor1/idle",
  Actor1Run = "texture/actor/actor1/run",
  Weapon1Idle = "texture/weapon/weapon1/idle",
  Weapon1Run = "texture/weapon/weapon1/idle/run",
}