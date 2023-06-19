/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-19 10:37:55
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-19 10:44:02
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Common\Utils.ts
 * @Description  : 
 */
export const toFixed = (num: number, digit: number = 3) => {
    const scale = 10 ** digit;
    return Math.floor(num * scale) / scale;
}