import { GapEvent } from 'gap/GapEvent';
import { oneElem, createElem } from 'gap/web';
import Coder from './Coder';
import Parser from './Parser';

const buildCtn = (ctn) => {
  const styleElem = createElem('style');
  styleElem.setAttribute('type', 'text/css');
  styleElem.innerHTML = `
          html, body, .page {
              height: 100%;
              overflow: hidden;
          }
      `;
  oneElem('head').appendChild(styleElem);

  ctn.addClass('markdown-editor');

  ctn.html`
    <div class="item coder-section">
        <div class="coder" id="editor-coder"></div>
    </div>
    <div class="item preview-section">
        <div class="preview" id="editor-preview"></div>
    </div>
  `;

  return ctn;
};

const DefaultContent = '# TecPoster Markdown Title\n';

export default class Markdown {
  constructor(ctnElem, content, tools) {
    const {
      hljs,
      katex,
      markdownit,
      monaco,
    } = tools;

    this.event = new GapEvent();

    this.ctnElem = buildCtn(ctnElem);
    this.previewElem = this.ctnElem.oneElem('.preview');
    this.coderElem = this.ctnElem.oneElem('.coder');

    this.content = content || DefaultContent;

    this.coder = new Coder(
      monaco,
      this.coderElem,
      this.content,
    );
    this.parser = new Parser(hljs, katex, markdownit);
    this.previewElem.innerHTML = this.parser.toHTML(this.content);

    this.register();
  }

  register() {
    this.coder.onChange(() => {
      this.preview(this.coder.getContent());
    });
  }

  preview(content) {
    this.previewElem.innerHTML = this.parser.toHTML(content);
  }
}
