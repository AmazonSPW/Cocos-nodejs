/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 19:19:52
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-19 12:54:10
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Utils\index.ts
 * @Description  : 
 */
import fs from "fs-extra";
import path from "path";

//symlink同步
export const symlinkCommon = async () => {
  const src = path.resolve(__dirname, "../Common");
  const dst = path.resolve(__dirname, "../../../client/assets/Scripts/Common");

  if (
    (await fs
      .lstat(dst)
      .then((v) => v.isSymbolicLink())
      .catch(() => false)) &&
    (await fs.readlink(dst)) === src
  ) {
    console.log("同步成功！");
  } else {
    fs.symlink(src, dst)
      .then(() => {
        console.log("同步成功！");
      })
      .catch((e) => {
        console.log("同步失败！", e);
      });
  }
};

export const buffer2ArrayBuffer = (buffer: Buffer) => {
  const ab = new ArrayBuffer(buffer.length);
  const da = new DataView(ab);
  for (let i = 0; i < buffer.length; i++) {
    da.setUint8(i, buffer[i]);
  }
  return da.buffer;
}