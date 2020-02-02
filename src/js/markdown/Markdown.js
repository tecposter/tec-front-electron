import { oneElem, createElem } from '../gap/web';
import GapEvent from '../gap/GapEvent';
import Coder from './Coder';
import Parser from './Parser';

const MODE = {
  EDIT: 'edit',
  VIEW: 'view',
  PREVIEW: 'preview',
};

const buildCtn = () => {
  const ctn = createElem('div');
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

const extractTitle = (content) => {
  const matched = /# ([^\n]+)/.exec(content);
  if (matched) {
    return matched[1];
  }
  return '';
};

const DefaultContent = '# TecPoster Markdown Title\n';

export default class Markdown {
  constructor(tools) {
    const {
      hljs,
      katex,
      markdownit,
      monaco,
    } = tools;

    this.event = new GapEvent();

    this.ctnElem = buildCtn();
    this.previewElem = this.ctnElem.oneElem('.preview');
    this.previewWrap = this.previewElem.parentElement;
    this.coderElem = this.ctnElem.oneElem('.coder');
    this.coderWrap = this.coderElem.parentElement;

    const content = DefaultContent;

    this.coder = new Coder(
      monaco,
      this.coderElem,
      content,
    );
    this.parser = new Parser(hljs, katex, markdownit);

    this.setPreview(content);
    this.register();

    /*
    this.mode = MODE.PREVIEW;
    this.adjustLayout();
    */
    this.previewMode();
    window.on('resize', () => this.adjustLayout());
  }

  appendTo(node) {
    if (node instanceof Node) {
      node.appendChild(this.ctnElem);
    }
  }

  register() {
    this.coder.onChange(() => {
      this.setPreview(this.coder.getContent());
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

  getTitle() {
    return extractTitle(this.getContent());
  }

  getContent() {
    return this.coder.getContent();
  }

  setContent(content) {
    this.coder.setContent(content);
  }

  setPreview(content) {
    this.previewElem.innerHTML = this.parser.toHTML(content);
  }

  adjustLayout() {
    if (this.mode === MODE.PREVIEW) {
      const colWidth = this.ctnElem.offsetWidth / 2;
      this.coderWrap.style.width = `${colWidth}px`;
      this.previewWrap.style.width = `${colWidth}px`;
    }
  }

  viewMode() {
    this.mode = MODE.VIEW;
    this.coderWrap.hide();
    this.previewWrap.show();
    this.previewWrap.style.width = '100%';
  }

  editMode() {
    this.mode = MODE.EDIT;
    this.previewWrap.hide();
    this.coderWrap.show();
    this.coderWrap.style.width = '100%';
  }

  previewMode() {
    this.mode = MODE.PREVIEW;
    this.previewWrap.show();
    this.coderWrap.show();
    this.adjustLayout();
  }

  onChange(fun) {
    this.coder.onChange(fun);
  }
}
