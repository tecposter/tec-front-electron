import DefaultRenderer from './DefaultRenderer';

let gDefaultRenderer;

export default {
  regDefaultRenderer: (ipcRenderer, postList, postCtn) => {
    gDefaultRenderer = new DefaultRenderer(ipcRenderer, postList, postCtn);
  },

  getDefaultRenderer: () => gDefaultRenderer,
};
