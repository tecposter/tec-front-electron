import {asSingle} from 'fun/asSingle';
import {asLoadRes} from 'fun/asLoadRes';

// https://github.com/markdown-it/markdown-it/

const MarkdownItRes = {
  jses: ['/markdown-it/markdown-it.min.js']
};

export const asMarkdownIt = async () => {
  return await asSingle('markdown-it', async() => {
    await asLoadRes(MarkdownItRes);
    return window.markdownit;
  });
};
