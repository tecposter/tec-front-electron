import { asLoadRes } from 'asset-loader';
import asSingle from 'as-single';

// https://github.com/markdown-it/markdown-it/

const MarkdownItRes = {
  jses: ['/mdit/markdown-it.min.js'],
};

export default async () => asSingle('mdit', async () => {
  await asLoadRes(MarkdownItRes);
  return window.markdownit;
});
