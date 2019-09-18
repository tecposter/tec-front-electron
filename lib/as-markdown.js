import asMonaco from './third/as-monaco';
import asMarkdownit from './third/as-markdownit';
import asHLJS from './third/as-hljs';
import asKatex from './third/as-katex';
import Markdown from './markdown';

export default async (ctn, content) => {
  const hljs = await asHLJS();
  const katex = await asKatex();
  const markdownit = await asMarkdownit();
  const monaco = await asMonaco();

  return new Markdown(
    ctn,
    content,
    {
      hljs,
      katex,
      markdownit,
      monaco,
    },
  );
};
