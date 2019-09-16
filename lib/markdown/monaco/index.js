import { asLoadJs, asLoadRes, asSingle } from './loader';
import { createElem } from './web';

const MonacoScript = 'var require = { paths: { "vs": "/monaco/min/vs" } };';
const MonacoRes = {
  csses: [
    [
      '/monaco/min/vs/editor/editor.main.css',
      { 'data-name': 'vs/editor/editor.main' }
    ]
  ],
  jses: [
    '/monaco/min/vs/loader.js',
    '/monaco/min/vs/editor/editor.main.nls.js',
    '/monaco/min/vs/editor/editor.main.js',
  ]
};
const MonacoBaseUrl = '/monaco/min/';
const MonacoWorkerMainUrl = '/monaco/min/vs/base/worker/workerMain.js';

export const asMonaco = async () => {
  return await asSingle('gapCoderMonaco', async () => {
    const scriptElem = createElem('script');
    scriptElem.type = 'text/javascript';
    scriptElem.innerHTML = MonacoScript;
    await asLoadJs(scriptElem);
    await asLoadRes(MonacoRes);
    // https://github.com/Microsoft/monaco-editor/blob/master/docs/integrate-amd-cross.md
    window.MonacoEnvironment = {
      getWorkerUrl: function () {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
                    self.MonacoEnvironment = {
                        baseUrl: '${MonacoBaseUrl}'
                    };
                    importScripts('${MonacoWorkerMainUrl}');`
        )}`;
      }
    };
    return window.monaco;
  });
};
