import { contextBridge, ipcRenderer } from 'electron';

// 暴露IPC调用方法
contextBridge.exposeInMainWorld(
  'ipc',
  (channel: string, ...args: any[]): Promise<any> => {
    console.log('ipc', channel, args);
    return ipcRenderer.invoke(channel, ...args);
  },
);
