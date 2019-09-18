import { asLoadJs, asLoadRes } from 'asset-loader';
import { createElem } from 'gap/web';
import asSingle from 'as-single';

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

// https://github.com/Microsoft/monaco-editor/blob/master/docs/integrate-amd-cross.md
// https://github.com/Microsoft/monaco-editor-samples/blob/master/browser-script-editor/index.html
export default async () => asSingle('monaco', async () => {
  const scriptElem = createElem('script');
  scriptElem.type = 'text/javascript';
  scriptElem.innerHTML = MonacoScript;
  await asLoadJs(scriptElem);
  await asLoadRes(MonacoRes);
  return window.monaco;
});
