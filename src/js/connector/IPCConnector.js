import GapEvent from '../gap/GapEvent';
import WS_MESSAGE from './common';

const assertCMD = (cmd) => {
  if (!cmd) {
    throw new Error('Incorrect CMD Format');
  }
};

export default class IPCConnector {
  constructor(ipcRenderer) {
    ipcRenderer.removeAllListeners(WS_MESSAGE);

    this.ipcRenderer = ipcRenderer;
    this.event = new GapEvent();
  }

  connect() {
    this.ipcRenderer.on(WS_MESSAGE, (event, arg) => {
      const res = JSON.parse(arg);
      if (res.status === 'ok') {
        this.event.trigger(res.cmd, res.data);
      } else if (res.status === 'error') {
        throw new Error(res.data.error);
      } else {
        throw new Error('unknown error');
      }
    });
  }

  onReceive(cmd, fun) {
    assertCMD(cmd);
    this.event.on(cmd, fun);
    return this;
  }

  send(cmd, params) {
    assertCMD(cmd);
    this.ipcRenderer.send(WS_MESSAGE, JSON.stringify({ cmd, params }));
  }
}
