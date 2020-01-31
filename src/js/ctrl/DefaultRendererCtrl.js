import GapEvent from '../gap/GapEvent';

import { WS_MESSAGE, INTERNAL_MESSAGE } from './common';
import assertCMD from './assertCMD';

export default class DefaultRendererCtrl {
  constructor(ipcRenderer, postList, postEditor) {
    this.ipcRenderer = ipcRenderer;
    this.postList = postList;
    this.postEditor = postEditor;
    this.internalEvent = new GapEvent();
    this.wsEvent = new GapEvent();

    this.currentPost = null;

    this.regIPCRenderer();
    this.regInternalReceiving();
    this.regWSReceiving();
    this.regPostList();

    this.sendWS('post.list');
  }

  regIPCRenderer() {
    this.ipcRenderer.removeAllListeners(WS_MESSAGE);
    this.ipcRenderer.on(WS_MESSAGE, (event, arg) => {
      const res = JSON.parse(arg);
      if (res.status === 'ok') {
        this.wsEvent.trigger(res.cmd, res.data);
      } else if (res.status === 'error') {
        throw new Error(res.data.error);
      } else {
        throw new Error('unknown error');
      }
    });

    this.ipcRenderer.removeAllListeners(INTERNAL_MESSAGE);
    this.ipcRenderer.on(INTERNAL_MESSAGE, (_event, arg) => {
      const { cmd, params } = arg;
      this.internalEvent.trigger(cmd, params);
    });
  }

  onWSReceive(cmd, fun) {
    assertCMD(cmd);
    this.wsEvent.on(cmd, fun);
    return this;
  }

  onInternalReceive(cmd, fun) {
    assertCMD(cmd);
    this.internalEvent.on(cmd, fun);
    return this;
  }

  sendWS(cmd, params) {
    assertCMD(cmd);
    this.ipcRenderer.send(WS_MESSAGE, JSON.stringify({ cmd, params }));
  }

  regInternalReceiving() {
    this.onInternalReceive('post.edit', () => {
      const currentPost = this.getCurrentPost();
      if (!currentPost) {
        return;
      }
      this.sendWS('post.edit', { postID: currentPost.id });
    });
  }

  regWSReceiving() {
    this.onWSReceive('post.list', ({ posts }) => this.postList.load(posts));

    this.onWSReceive('post.fetch', ({ post }) => {
      this.setCurrentPost(post);
      this.postList.select(post);
      this.postEditor.view(post);
    });

    this.onWSReceive('post.create', ({ post }) => {
      this.setCurrentPost(post);
      this.postList.add(post);
      this.postEditor.preview(post);
    });

    this.onWSReceive('post.edit', ({ post }) => {
      this.setCurrentPost(post);
      this.postList.select(post);
      this.postEditor.preview(post);
    });
  }

  regPostList() {
    this.postList.onSelect((post) => this.sendWS('post.fetch', { postID: post.id }));
  }

  setCurrentPost(post) {
    this.currentPost = post;
  }

  getCurrentPost() {
    return this.currentPost;
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
