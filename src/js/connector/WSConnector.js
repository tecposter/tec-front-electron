import WebSocket from 'ws';
import WS_MESSAGE from './common';

export default class WSConnect {
  constructor(wsAddr, ipcMain, webContents) {
    this.ws = new WebSocket(wsAddr);

    ipcMain.removeAllListeners(WS_MESSAGE);
    this.ipcMain = ipcMain;

    this.webContents = webContents;
  }

  connect() {
    this.ipcMain.on(WS_MESSAGE, (event, arg) => {
      this.ws.send(arg);
    });

    this.ws.on('message', (data) => {
      this.webContents.send(WS_MESSAGE, data);
    });
  }
}
/*
import WebSocket from 'ws';
const ws = new WebSocket('ws://localhost:7890/ws');
ws.on('open', () => {
  ws.send('{"cmd": "draft.list"}');
});

ws.on('message', (data) => {
  console.log(data);
});
*/
