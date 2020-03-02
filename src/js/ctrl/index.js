import mainCtrl from './mainCtrl';
import DefaultRendererCtrl from './DefaultRendererCtrl';

let gDefaultRendererCtrl;

export default {
  getMainCtrl: () => mainCtrl,

  regDefaultRendererCtrl: (ipcRenderer, postList, postEditor, postCtn) => {
    gDefaultRendererCtrl = new DefaultRendererCtrl(ipcRenderer, postList, postEditor, postCtn);
  },

  getDefaultRendererCtrl: () => gDefaultRendererCtrl,
};
