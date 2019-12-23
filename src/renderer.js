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

import { asCreateMarkdown } from 'markdown';
import { oneElem } from 'gap/web';
import PageCtn from 'PageCtn';
import PostList from 'PostList';
import WSClient from 'WSClient';

/*
const pageElem = oneElem('.page');
const ctnElem = createElem('div');
pageElem.appendChild(ctnElem);
*/

const createMD = (ctn, content) => asCreateMarkdown(
  ctn,
  content,
  {
    hljsRes: {
      csses: ['/hljs/styles/default.css'],
      jses: [
        '/hljs/highlight.pack.js',
      ],
    },
    katexRes: {
      csses: ['/katex/katex.min.css'],
      jses: ['/katex/katex.min.js'],
    },
    markdownitRes: {
      jses: ['/mdit/markdown-it.min.js'],
    },
    monacoRes: {
      path: '/monaco/min/vs',
      csses: [
        [
          '/monaco/min/vs/editor/editor.main.css',
          { 'data-name': 'vs/editor/editor.main' },
        ],
      ],
      jses: [
        '/monaco/min/vs/loader.js',
        '/monaco/min/vs/editor/editor.main.nls.js',
        '/monaco/min/vs/editor/editor.main.js',
      ],
    },
  },
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

  const wsClient = new WSClient('ws://127.0.0.1/ws');

  wsClient.receive('post.fetch', data => {
    console.log(data);
  });

  postList.onSelect(id => {
    wsClient.send('post.fetch', { id });
  });
})();
