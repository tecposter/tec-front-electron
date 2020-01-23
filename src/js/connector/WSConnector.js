import WebSocket from 'ws';
import WS_MESSAGE from './common';
import assertCMD from './assertCMD';

export default class WSConnect {
  constructor(wsAddr, ipcMain) {
    this.ws = new WebSocket(wsAddr);

    ipcMain.removeAllListeners(WS_MESSAGE);
    this.ipcMain = ipcMain;

    // this.webContents = webContents;
    this.webContentsSet = [];
  }

  addWebContents(webContents) {
    this.webContentsSet.push(webContents);
  }

  connect() {
    // send to websocket server
    this.ipcMain.on(WS_MESSAGE, (event, arg) => {
      this.ws.send(arg);
    });

    // send to all the BrowserWindows
    this.ws.on('message', (data) => {
      this.webContentsSet.forEach((webContents) => webContents.send(WS_MESSAGE, data));
    });
  }

  send(cmd, params) {
    assertCMD(cmd);
    this.ws.send(JSON.stringify({ cmd, params }));
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
