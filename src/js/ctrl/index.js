import mainCtrl from './mainCtrl';
import DefaultRendererCtrl from './DefaultRendererCtrl';

let gDefaultRendererCtrl;

export default {
  getMainCtrl: () => mainCtrl,

  regDefaultRendererCtrl: (ipcRenderer, postList, postEditor) => {
    gDefaultRendererCtrl = new DefaultRendererCtrl(ipcRenderer, postList, postEditor);
  },

  getDefaultRendererCtrl: () => gDefaultRendererCtrl,
};
