import asSingle from 'as-single';
import { asLoadRes } from 'asset-loader';

// https://github.com/markdown-it/markdown-it/

const MarkdownItRes = {
  jses: ['/mdit/markdown-it.min.js'],
};

export default async () => asSingle('mdit', async () => {
  await asLoadRes(MarkdownItRes);
  return window.markdownit;
});
