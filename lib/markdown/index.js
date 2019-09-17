import Markdown from './Markdown';
import asMonaco from './monaco';

export default async (ctnElem, content) => {
  const monaco = await asMonaco();

  return new Markdown(monaco, ctnElem, content);
};
