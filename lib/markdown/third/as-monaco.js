import { createElem } from 'gap/web';
import asSingle from '../util/as-single';
import { asLoadJs, asLoadRes } from '../util/asset-loader';

/*
const MonacoScript = 'var require = { paths: { "vs": "/monaco/min/vs" } };';
const MonacoRes = {
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
};
*/

// https://github.com/Microsoft/monaco-editor/blob/master/docs/integrate-amd-cross.md
// https://github.com/Microsoft/monaco-editor-samples/blob/master/browser-script-editor/index.html
export default async (monacoRes) => asSingle('monaco', async () => {
  const { path, csses, jses } = monacoRes;
  const monacoScript = `var require = { paths: { "vs": "${path}" } };`;
  const scriptElem = createElem('script');
  scriptElem.type = 'text/javascript';
  scriptElem.innerHTML = monacoScript;
  await asLoadJs(scriptElem);
  await asLoadRes({ csses, jses });
  return window.monaco;
});
