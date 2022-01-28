import { spawn } from "child_process";
import { resolve } from "path";
import webpack from "webpack";
import del from "del";
import { rendererConfig, mainConfig } from "./config/webpack";

/**
 * 编译
 */
export const compile = (): Promise<void> => new Promise<void>(async (resolve, reject) => {
  await del(["target/**/*"]);
  const compiler = webpack([rendererConfig, mainConfig]);
  compiler.run(err => err ? reject(err) : resolve());
});

/**
 * 调试启动
 */
export const dev = async () => {
  console.log("hello 1111");
  await compile();
  const main = resolve(__dirname, "target/main.js");
  spawn("electron", [main, '--no-sandbox'], {
    env: { ...process.env, NODE_ENV: 'development' },
    stdio: 'inherit',
  });
}