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
const MonacoBaseUrl = '/monaco/min/';
const MonacoWorkerMainUrl = '/monaco/min/vs/base/worker/workerMain.js';

export default async () => asSingle('monaco', async () => {
  const scriptElem = createElem('script');
  scriptElem.type = 'text/javascript';
  scriptElem.innerHTML = MonacoScript;
  await asLoadJs(scriptElem);
  await asLoadRes(MonacoRes);
  // https://github.com/Microsoft/monaco-editor/blob/master/docs/integrate-amd-cross.md
  window.MonacoEnvironment = {
    getWorkerUrl: () => `data:text/javascript;charset=utf-8,${encodeURIComponent(`
      self.MonacoEnvironment = {
          baseUrl: '${MonacoBaseUrl}'
      };
      importScripts('${MonacoWorkerMainUrl}');`)}`,
  };
  return window.monaco;
});
