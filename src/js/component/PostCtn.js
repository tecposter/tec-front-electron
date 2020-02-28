import { MultiCol } from './base';

export default class PostCtn extends MultiCol {
  constructor() {
    super(1, 1, 'post-ctn');

    this.side = this.getCol(0);
    this.main = this.getCol(1);

    this.showSideBtn = this.main.oneElem('.show-side');
    this.hideSideBtn = this.main.oneElem('.hide-side');

    this.showSideBtn.on('click', () => this.showSide());
    this.hideSideBtn.on('click', () => this.hideSide());

    this.hideSide();
  }

  hideSide() {
    this.side.hide();
    this.hideSideBtn.hide();
    this.showSideBtn.show();
  }

  showSide() {
    this.side.show();
    this.showSideBtn.hide();
    this.hideSideBtn.show();
  }

  initCols() {
    this.getCol(0).html`
    <div class="head">
      side head
    </div>
    <div class="body">
    </div>
    `;

    this.getCol(1).html`
    <div class="head">
      <a class="show-side toggle">
        Show Side
        &gt;&gt;
      </a>
      <a class="hide-side toggle">
        &lt;&lt;
      </a>
    </div>
    <div class="body">
    </div>
    `;
  }
}
