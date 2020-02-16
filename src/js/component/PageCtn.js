import MultiCol from './MultiCol';

export default class PageCtn extends MultiCol {
  constructor() {
    super(1, 1);


    this.sideBar = this.getCol(0);
    this.mainBoard = this.getCol(1);

    this.mainBoard.html`<div class="main-panel"></div>`;
    this.mainPanel = this.mainBoard.oneElem('.main-panel');
  }

  getSideBar() {
    return this.sideBar;
  }

  getMainBoard() {
    return this.mainBoard;
  }

  getMainPanel() {
    return this.mainPanel;
  }
}
