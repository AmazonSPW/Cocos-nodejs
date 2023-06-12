/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-12 19:14:12
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
}

export enum ETexTurePath {
  Actor1Idle = "texture/actor/actor1/idle",
  Actor1Run = "texture/actor/actor1/run",
}