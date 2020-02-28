import { MultiCol } from './base';

export default class PostCtn extends MultiCol {
  constructor() {
    super(1, 1, 'post-ctn');

    // this.side = this.getCol(0);
    // this.main = this.getCol(1);
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
      main head
    </div>
    <div class="body">
    </div>
    `;
  }
}
