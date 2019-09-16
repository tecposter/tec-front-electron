import {asSingle} from 'fun/asSingle';
import {asLoadRes} from 'fun/asLoadRes';

// https://highlightjs.org/?ref=tecposter

const HighlightRes = {
  csses: ['/hljs/styles/default.css'],
  jses: [
    '/hljs/highlight.pack.js',
  ]
};

export const asHLJS = async () => {
  return await asSingle('highlight-js', async () => {
    await asLoadRes(HighlightRes);
  });
};
