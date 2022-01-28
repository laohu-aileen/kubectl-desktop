import { app, BrowserWindow } from 'electron';
import { join } from "path";

app.whenReady().then(() => {
  console.log("hello");
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadFile(join(__dirname, 'index.html'));
  win.webContents.openDevTools();
})