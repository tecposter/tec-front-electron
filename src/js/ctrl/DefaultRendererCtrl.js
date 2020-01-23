import GapEvent from '../gap/GapEvent';

import { WS_MESSAGE } from './common';
import assertCMD from './assertCMD';

export default class DefaultRendererCtrl {
  constructor(ipcRenderer, postList, postEditor) {
    this.ipcRenderer = ipcRenderer;
    this.postList = postList;
    this.postEditor = postEditor;
    this.event = new GapEvent();

    this.currentPost = null;

    this.regIPCRenderer();
    this.regReceiving();
    this.regPostList();

    this.send('post.list');
  }

  regIPCRenderer() {
    this.ipcRenderer.removeAllListeners(WS_MESSAGE);
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

  regReceiving() {
    this.onReceive('post.list', ({ posts }) => this.postList.load(posts));
    this.onReceive('post.fetch', ({ post }) => {
      this.setCurrentPost(post);
      this.postList.select(post);
      this.postEditor.view(post);
    });
    this.onReceive('post.create', ({ post }) => {
      this.setCurrentPost(post);
      this.postList.add(post);
      this.postEditor.preview(post);
    });
  }

  regPostList() {
    this.postList.onSelect((post) => this.send('post.fetch', { postID: post.id }));
  }

  setCurrentPost(post) {
    this.currentPost = post;
  }
}

/*
export default (ipcRenderer, postList, postEditor) => {
  regIPCRenderer(ipcRenderer);
};
*/

/*
  const ipcConnector = new IPCConnector(ipcRenderer);
  ipcConnector.onReceive('post.list', ({ posts }) => {
    postList.load(posts);
  });
  ipcConnector.onReceive('post.fetch', ({ post }) => {
    postEditor.view(post);
  });
  ipcConnector.onReceive('post.create', ({ post }) => {
    postList.add(post);
  });

  ipcConnector.connect();
  ipcConnector.send('post.list');

  postList.onSelect((post, selectType) => {
    if (selectType === PostList.ACTION.VIEW) {
      ipcConnector.send('post.fetch', { postID: post.id });
    }
  });

import GapEvent from '../gap/GapEvent';
import WS_MESSAGE from './common';
import assertCMD from './assertCMD';

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
  */
