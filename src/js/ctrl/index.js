import WebSocket from 'ws';
import DefaultRendererCtrl from './DefaultRendererCtrl';
import { MESSAGE, WS_MESSAGE } from './common';

let gWS;
let gIPCMain;
let gDefaultWebContents;
let gDefaultRendererCtrl;

export default {
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

  regDefaultRendererCtrl: (ipcRenderer, postList, postEditor) => {
    gDefaultRendererCtrl = new DefaultRendererCtrl(ipcRenderer, postList, postEditor);
  },

  getDefaultRendererCtrl: () => gDefaultRendererCtrl,

  triggerCreatePost: () => gWS.send(JSON.stringify({ cmd: 'post.create' })),
};
