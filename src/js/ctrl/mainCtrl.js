import WebSocket from 'ws';
import { MESSAGE, WS_MESSAGE, INTERNAL_MESSAGE } from './common';

let gWS;
let gIPCMain;
let gDefaultWebContents;

const mainCtrl = {
  connectWS: (ipcMain, wsAddr) => {
    gWS = new WebSocket(wsAddr);
    // send to websocket server
    gWS.on(MESSAGE, (data) => {
      gDefaultWebContents.send(WS_MESSAGE, data);
    });

    gIPCMain = ipcMain;
    gIPCMain.removeAllListeners(WS_MESSAGE);
    // send to websocket server
    gIPCMain.on(WS_MESSAGE, (event, arg) => {
      gWS.send(arg);
    });
  },

  setDefaultWebContents: (webContents) => {
    gDefaultWebContents = webContents;
  },

  sendWS: (cmd, params) => gWS.send(JSON.stringify({ cmd, params })),

  sendInternal: (cmd, params) => gDefaultWebContents.send(INTERNAL_MESSAGE, { cmd, params }),

  triggerCreatePost: () => mainCtrl.sendWS('post.create'),

  triggerEditPost: () => mainCtrl.sendInternal('post.edit'),
};

export default mainCtrl;
