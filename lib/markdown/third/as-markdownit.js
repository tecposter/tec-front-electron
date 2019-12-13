import { asLoadRes } from '../util/asset-loader';
import asSingle from '../util/as-single';

// https://github.com/markdown-it/markdown-it/

/*
const MarkdownItRes = {
  jses: ['/mdit/markdown-it.min.js'],
};
*/

export default async (markdownitRes) => asSingle('mdit', async () => {
  await asLoadRes(markdownitRes);
  return window.markdownit;
});
