import GapEvent from 'gap/GapEvent';

const STATUS = {
  OK: 'ok',
  ERROR: 'error',
};

const ERROR_UNKOWN = new Error('Error Unkown');
const ERROR_CMD_FORMAT = new Error('Error CMD Format');

const assertCMD = (cmd) => {
  if (!cmd) {
    throw ERROR_CMD_FORMAT;
  }
};

/*
const wsClient = new WSClient();
wsClient.connect();

wsClient.send('command a', {data: 'content});
wsClient.receive('command 1', (data) => console.log(data));

wsClient.close();
*/
export default class WSClient {
  constructor(apiURL) {
    this.apiURL = apiURL;
    this.event = new GapEvent();
    this.sendingData = [];
  }

  connect() {
    this.socket = this.createWebSocket();
    return this;
  }

  close() {
    this.socket.close();
  }

  createWebSocket() {
    const socket = new WebSocket(this.apiURL);
    socket.onmessage = (evt) => this.handleMessage(evt);
    socket.onopen = () => this.onopen();
    return this.socket;
  }

  handleMessage(message) {
    const res = JSON.parse(message.data);
    if (res.status === STATUS.OK) {
      this.event.trigger(res.cmd, res.data);
    } else if (res.status === STATUS.ERROR) {
      throw new Error(res.data);
    } else {
      throw ERROR_UNKOWN;
    }
  }

  pendSendingData(json) {
    this.sendingData.push(json);
  }

  onopen() {
    this.sendingData.forEach((json) => this.socket.send(json));
    this.sendingData = [];
  }

  receive(cmd, fun) {
    assertCMD(cmd);
    this.event.on(cmd, fun);
    return this;
  }

  send(cmd, params) {
    assertCMD(cmd);
    const json = JSON.stringify({ cmd, params });
    if (this.socket.readyState === WebSocket.CLOSING
      || this.socket.readyState === WebSocket.CLOSED) {
      this.socket = this.createWebSocket();
    }

    if (this.socket.readyState === WebSocket.CONNECTING) {
      this.pendSendingData(json);
    } else if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(json);
    }
  }
}
