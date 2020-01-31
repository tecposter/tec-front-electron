import Base from './Base';

export default class PageCtn extends Base {
  constructor() {
    super('div', 'page-ctn');

    this.ctn.html`
      <div class="side-bar column">
      </div>
      <div class="main-board column">
        <div class="main-panel"></div>
      </div>
    `;

    this.sideBar = this.ctn.oneElem('.side-bar');
    this.mainBoard = this.ctn.oneElem('.main-board');
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