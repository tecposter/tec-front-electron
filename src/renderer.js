/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './scss/main.scss';
/*
import * as monaco from 'monaco-editor';
import 'markdown';

// console.log(monaco);

monaco.editor.create(document.getElementById('editor-coder'), {
    value: '# Hello World',
    language: 'markdown',
    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 84,
    wordWrapMinified: true,
    wrappingIndent: 'same'
});
*/

// console.log('👋 This message is being logged by "renderer.js", included via webpack');


import { asCreateMarkdown } from './js/markdown';
import { oneElem } from './js/gap/web';
import PageCtn from './js/PageCtn';
import PostList from './js/PostList';
import { IPCConnector } from './js/connector';
import config from './config';

/*
const pageElem = oneElem('.page');
const ctnElem = createElem('div');
pageElem.appendChild(ctnElem);
*/

const { ipcRenderer } = window.nodeRequire('electron');
/*
 * https://electronjs.org/docs/faq#i-can-not-use-jqueryrequirejsmeteorangularjs-in-electron
 * <head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
*/

const createMD = (ctn, content) => asCreateMarkdown(
  ctn,
  content,
  config.markdown,
);

(async () => {
  const pageCtn = new PageCtn(oneElem('.page'));
  const content = '# Article Title';
  // const markdown = await asMarkdown(pageCtn.getMainPanel(), content);
  const markdown = await createMD(pageCtn.getMainPanel(), content);
  markdown.setContent('# content changed');

  const postList = new PostList(
    pageCtn.getSideBar(),
    [
      { id: 'fffeedc', title: 'Post title' },
    ],
  );
  postList.load([
    { id: 'xfderqd', title: 'Reset audio or video' },
    { id: 'i234', title: 'Reset book test 134d' },
  ]);

  const ipcConnector = new IPCConnector(ipcRenderer);

  ipcConnector.onReceive('draft.list', (data) => {
    console.log(data);
  });
  ipcConnector.connect();

  postList.onSelect(() => ipcConnector.send('draft.list'));
  ipcConnector.send('draft.list');
})();
