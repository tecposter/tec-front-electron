import asMonaco from './as-monaco';
import asMDIT from './as-mdit';
import Markdown from './markdown/Markdown';

export default async (ctn, content) => {
  const mdit = await asMDIT();
  const monaco = await asMonaco();

  return new Markdown(monaco, mdit, ctn, content);
};
