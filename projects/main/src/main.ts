import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { ipcLoader } from './util';

// 开发环境判定
const isDevelopment = !app.isPackaged;

// 入口路径生成
const preload = join(__dirname, 'preload.js');
const index = join(__dirname, '../render/index.html');

// 创建窗口
const createWindow = () => {
  const win = new BrowserWindow({
    width: isDevelopment ? 1800 : 1200,
    height: 800,
    webPreferences: {
      preload,
    },
  });
  if (isDevelopment) {
    win.loadURL('http://localhost:8000');
    win.webContents.openDevTools();
  } else {
    win.loadFile(index);
  }
};

// 应用就绪处理
app.whenReady().then(() => {
  ipcLoader();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 窗口全部关闭
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
