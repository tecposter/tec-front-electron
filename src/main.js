// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, ipcMain } from 'electron';
// import { WSConnector } from './js/connector';
import config from './js/config';
import createMenu from './js/menu/createMenu';
import ctrl from './js/ctrl';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

/*
const wsConnector = new WSConnector(config.ws.addr, ipcMain);
wsConnector.connect();
*/
ctrl.connectWS(ipcMain, config.ws.addr);

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // const wsAddr = 'ws://192.168.56.7:7890/ws';
  // const wsConnector = new WSConnector(config.ws.addr, ipcMain, mainWindow.webContents);
  ctrl.setDefaultWebContents(mainWindow.webContents);
  // wsConnector.addWebContents(mainWindow.webContents);
  /*
  mainWindow.webContents.on('did-finish-load', () => {
    const wsAddr = 'ws://192.168.56.7:7890/ws';
    const wsConnector = new WSConnector(wsAddr, ipcMain, mainWindow.webContents);
    wsConnector.connect();
  });
  */

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
createMenu();

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

/*
const wsClient = new WSClient('ws://localhost:7890/ws');
wsClient.receive('post.fetch', data => {
  console.log(data);
});

wsClient.connect();
wsClient.send('post.fetch', { id });
*/
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
