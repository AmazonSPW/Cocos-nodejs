/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-19 10:15:29
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Utils\index.ts
 * @Description  : 
 */
import { SpriteFrame } from "cc";

const INDEX_REG = /\((\d+)\)/;

const getNumberWithinString = (str: string) => parseInt(str.match(INDEX_REG)?.[1] || "0");

export const sortSpriteFrame = (spriteFrame: Array<SpriteFrame>) =>
  spriteFrame.sort((a, b) => getNumberWithinString(a.name) - getNumberWithinString(b.name));

/**
 * 深度拷贝
 * @param obj 
 * @returns 
 */
export const deepClone = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) return obj;

  const res = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = deepClone(obj[key])
    }
  }
  return res;
}