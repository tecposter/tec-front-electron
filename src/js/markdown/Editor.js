import {
  Component,
  GapEvent,
  oneElem,
  createElem,
} from './gap';

const MODE = {
  EDIT: 'edit',
  VIEW: 'view',
  PREVIEW: 'preview',
};

const adjustStyle = () => {
  const styleElem = createElem('style');
  styleElem.setAttribute('type', 'text/css');
  styleElem.innerHTML = `
          html, body, .page {
              height: 100%;
              overflow: hidden;
          }
      `;
  oneElem('head').appendChild(styleElem);
};

const extractTitle = (content) => {
  const matched = /# ([^\n]+)/.exec(content);
  if (matched) {
    return matched[1];
  }
  return '';
};

const DefaultContent = '# TecPoster Markdown Title\n';

export default class Editor extends Component {
  constructor(coder, parser) {
    super('div', 'markdown-editor');
    this.ctn.html`
      <div class="item coder-section">
      </div>
      <div class="item preview-section">
          <div class="preview"></div>
      </div>
    `;
    adjustStyle();

    this.event = new GapEvent();
    this.coderWrap = this.ctn.oneElem('.coder-section');
    this.previewWrap = this.ctn.oneElem('.preview-section');
    this.previewElem = this.ctn.oneElem('.preview');
    coder.appendTo(this.coderWrap);

    const content = DefaultContent;

    this.coder = coder;
    this.parser = parser;

    this.setPreview(content);
    this.register();

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
