import WebSocket from 'ws';
import DefaultRendererCtrl from './DefaultRendererCtrl';
import { MESSAGE, WS_MESSAGE } from './common';

let gDefaultRendererCtrl;

const rendererCtrl = {
  regDefaultRendererCtrl: (ipcRenderer, postList, postEditor) => {
    gDefaultRendererCtrl = new DefaultRendererCtrl(ipcRenderer, postList, postEditor);
  },

  getDefaultRendererCtrl: () => gDefaultRendererCtrl,

  sendWS: (cmd, params) => gWS.send(JSON.stringify({ cmd, params })),

  triggerCreatePost: () => ctrl.sendWS('post.create'),

  triggerEditPost: () => {
    console.log(gDefaultRendererCtrl);

    if (!gDefaultRendererCtrl) {
      return;
    }
    const currentPost = gDefaultRendererCtrl.getCurrentPost();

    console.log(currentPost);
    if (!currentPost) {
      return;
    }
    ctrl.sendWS('post.edit', { postID: currentPost.id });
  },
};

export default rendererCtrl;
