import asSingle from 'as-single';
import { asLoadRes } from 'asset-loader';

// https://highlightjs.org/?ref=tecposter

const HighlightRes = {
  csses: ['/hljs/styles/default.css'],
  jses: [
    '/hljs/highlight.pack.js',
  ],
};

export default async () => asSingle('hljs', async () => {
  await asLoadRes(HighlightRes);
  return window.hljs;
});
