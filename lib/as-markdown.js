import asMonaco from './as-monaco';
import asHLJS from './as-hljs';
import asMDIT from './as-mdit';
import Markdown from './markdown/Markdown';

export default async (ctn, content) => {
  const mdit = await asMDIT();
  const hljs = await asHLJS();
  const monaco = await asMonaco();

  return new Markdown(monaco, mdit, hljs, ctn, content);
};
