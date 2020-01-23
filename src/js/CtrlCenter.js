import WebSocket from 'ws';

let gWS;
let gIPCMain;
let gDefaultWebContents;
// let gIPCRendererSet = [];
// let gWebContentsSet = [];

const MESSAGE = 'message';
const WS_MESSAGE = 'ws-message';

export default {
  connectWS: (ipcMain, wsAddr) => {
    gWS = new WebSocket(wsAddr);
    // send to websocket server
    gWS.on(WS_MESSAGE, (data) => {
      gDefaultWebContents.send(WS_MESSAGE, data);
      // gWebContentsSet.forEach((webContents) => webContents.send(WS_MESSAGE, data));
    });

    gIPCMain = ipcMain;
    gIPCMain.removeAllListeners(WS_MESSAGE);
    // send to websocket server
    gIPCMain.on(MESSAGE, (event, arg) => {
      gWS.send(arg);
    });
  },

  setDefaultWebContents: (webContents) => {
    gDefaultWebContents = webContents;
  },

  regDefaultRenderer: (ipcRenderer, postList, postEditor)  =>{
  },

  /*
  addIPCRenderer(ipcRenderer) {
    gIPCRendererSet.push(ipcRenderer);
  },
  */
};
