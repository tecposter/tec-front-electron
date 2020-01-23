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
// import { oneElem } from './js/gap/web';
// import PageCtn from './js/PageCtn';
// import PostList from './js/PostList';
// import { IPCConnector } from './js/connector';
import config from './js/config';
import {
  PageCtn,
  SearchBar,
  PostList,
  PostEditor,
} from './js/component';
import ctrl from './js/ctrl';

/*
const pageElem = oneElem('.page');
const ctnElem = createElem('div');
pageElem.appendChild(ctnElem);
*/

const { ipcRenderer } = window.nodeRequire('electron');
// const { Menu, MenuItem } = remote;

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

/*
const createMD = (ctn, content) => asCreateMarkdown(
  ctn,
  content,
  config.markdown,
);
*/

(async () => {
  const pageCtn = new PageCtn();
  const searchBar = new SearchBar();
  const postList = new PostList();

  const markdown = await asCreateMarkdown(config.markdown);
  const postEditor = new PostEditor(markdown);

  pageCtn.appendTo(window.document.body);
  searchBar.appendTo(pageCtn.getSideBar());
  postList.appendTo(pageCtn.getSideBar());
  postEditor.appendTo(pageCtn.getMainPanel());

  ctrl.regDefaultRendererCtrl(ipcRenderer, postList, postEditor);
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
  */

  /*
  const menu = new Menu();
  menu.append(new MenuItem({
    label: 'MenuItem1',
    click() { console.log('item 1 clicked'); },
  }));
  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.popup({ window: remote.getCurrentWindow() });
  }, false);
  */
  /*
  const pageCtn = new PageCtn(oneElem('.page'));
  const content = '# Article Title';
  const markdown = await createMD(pageCtn.getMainPanel(), content);
  markdown.setContent('# TecPoster Markdown Editor');
  markdown.viewMode();

  const postList = new PostList(
    pageCtn.getSidePanel(),
  );

  const ipcConnector = new IPCConnector(ipcRenderer);
  ipcConnector.onReceive('draft.list', (data) => {
    console.log(data);
  });
  ipcConnector.onReceive('post.list', (data) => {
    if (data && data.posts) {
      postList.load(data.posts);
    }
    ipcConnector.send('draft.list');
  });
  ipcConnector.onReceive('post.fetch', (data) => {
    console.log(data);
    if (data && data.post) {
      markdown.setContent(data.post.content);
    }
  });

  ipcConnector.connect();
  ipcConnector.send('post.list');

  pageCtn.onNewPost(() => console.log('new post'));

  postList.onSelect((postID) => ipcConnector.send('post.fetch', { postID }));
  */
})();
