import { ipcMain } from 'electron';
import { readdirSync } from 'fs';
import { join } from 'path';

export const ipcLoader = () => {
  const baseDir = join(__dirname, '../ipc');
  for (const item of readdirSync(baseDir)) {
    if (!item.endsWith('.js')) continue;
    const path = join(baseDir, item);
    const handles = require(path);
    const name = item.substring(0, item.length - 3);
    for (const key in handles) {
      ipcMain.handle(`${name}:${key}`, handles[key]);
    }
  }
};
