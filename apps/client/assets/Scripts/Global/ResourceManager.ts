/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-14 20:55:46
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Global\ResourceManager.ts
 * @Description  : 
 */
import { Asset, resources } from "cc";
import { Singleton } from "../Base/Singleton";

@Singleton()
export class ResourceManager {
  public static Instance: ResourceManager;

  loadRes<T extends Asset>(path: string, type: new (...args: any[]) => T) {
    return new Promise<T>((resolve, reject) => {
      resources.load(path, type, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  loadDir<T extends Asset>(path: string, type: new (...args: any[]) => T) {
    return new Promise<T[]>((resolve, reject) => {
      resources.loadDir(path, type, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }
}
