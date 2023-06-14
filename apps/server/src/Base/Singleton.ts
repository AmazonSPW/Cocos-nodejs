/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-14 21:03:12
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Base\Singleton.ts
 * @Description  : 
 */
const SINGLETON_KEY = Symbol();
export function Singleton() {
  return function (type: { new(), instance: any }) {
    const proxyType = new Proxy(type, {
      construct(target, argArray, newTarget) {

        if (target.prototype !== newTarget.prototype) {
          return Reflect.construct(target, argArray, newTarget);
        }

        if (!target[SINGLETON_KEY]) {
          target[SINGLETON_KEY] = Reflect.construct(target, argArray, newTarget);
        }

        return target[SINGLETON_KEY];
      },
    });
    Reflect.defineProperty(proxyType, "instance", {
      get() {
        if (!this[SINGLETON_KEY]) {
          new this();
        }
        return this[SINGLETON_KEY];
      },
      set(v) {
        this[SINGLETON_KEY] = v;
      },
    });
    return proxyType;
  }
}