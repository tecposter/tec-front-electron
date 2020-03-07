import Coder from './Coder';
import Parser from './Parser';
import Editor from './Editor';

const DefaultContent = '# TecPoster Markdown Title\n';

export default class Markdown {
  constructor(tools) {
    const {
      hljs,
      katex,
      markdownit,
      monaco,
    } = tools;

    this.hljs = hljs;
    this.katex = katex;
    this.markdownit = markdownit;
    this.monaco = monaco;
  }

  createParser() {
    return new Parser(this.hljs, this.katex, this.markdownit);
  }

  createCoder() {
    return new Coder(this.monaco, DefaultContent);
  }

  createEditor() {
    return new Editor(
      this.createCoder(),
      this.createParser(),
    );
  }
}
