import { oneElem, createElem } from 'gap/web';
import GapEvent from 'gap/GapEvent';
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
  constructor(ctnElem, inContent, tools) {
    const {
      hljs,
      katex,
      markdownit,
      monaco,
    } = tools;

    this.event = new GapEvent();

    this.ctnElem = buildCtn(ctnElem);
    this.previewElem = this.ctnElem.oneElem('.preview');
    this.previewWrap = this.previewElem.parentElement;
    this.coderElem = this.ctnElem.oneElem('.coder');

    const content = inContent || DefaultContent;

    this.coder = new Coder(
      monaco,
      this.coderElem,
      content,
    );
    this.parser = new Parser(hljs, katex, markdownit);

    this.preview(content);
    this.register();
  }

  register() {
    this.coder.onChange(() => {
      this.preview(this.coder.getContent());
    });

    this.coder.onScroll((evt) => {
      if (!evt.scrollTopChanged) {
        return;
      }
      const lineCount = this.coder.getLineCount();
      const visible = this.coder.getVisibleRange();
      const max = lineCount - (visible.endLineNumber - visible.startLineNumber);

      const totalHeight = this.previewWrap.scrollHeight - this.previewWrap.offsetHeight;
      this.previewWrap.scrollTop = (totalHeight * visible.startLineNumber) / max;
    });
  }

  getContent() {
    return this.coder.getContent();
  }

  preview(content) {
    this.previewElem.innerHTML = this.parser.toHTML(content);
  }
}
