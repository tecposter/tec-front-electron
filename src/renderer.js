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

import asMarkdown from 'as-markdown';
import PageCtn from 'PageCtn';
import { oneElem } from 'gap/web';

/*
const pageElem = oneElem('.page');
const ctnElem = createElem('div');
pageElem.appendChild(ctnElem);
*/

const pageCtn = new PageCtn(oneElem('.page'));

(async () => {
  const content = '# Article Title';
  // const markdown = await asMarkdown(pageCtn.getMainPanel(), content);
  await asMarkdown(pageCtn.getMainPanel(), content);

  // console.log(markdown);
})();
