import asSingle from '../util/as-single';
import { asLoadRes } from '../util/asset-loader';

// https://highlightjs.org/?ref=tecposter

/*
const HighlightRes = {
  csses: ['/hljs/styles/default.css'],
  jses: [
    '/hljs/highlight.pack.js',
  ],
};
*/

export default async (hljsRes) => asSingle('hljs', async () => {
  await asLoadRes(hljsRes);
  return window.hljs;
});
