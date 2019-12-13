import asMonaco from './third/as-monaco';
import asMarkdownit from './third/as-markdownit';
import asHLJS from './third/as-hljs';
import asKatex from './third/as-katex';
import Markdown from './Markdown';

export default async (ctn, content, reses) => {
  const {
    hljsRes,
    katexRes,
    markdownitRes,
    monacoRes,
  } = reses;
  const [hljs, katex, markdownit, monaco] = await Promise.all([
    asHLJS(hljsRes),
    asKatex(katexRes),
    asMarkdownit(markdownitRes),
    asMonaco(monacoRes),
  ]);

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
