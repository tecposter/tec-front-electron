export default class PageCtn {
  constructor(ctn) {
    this.ctn = ctn;
    this.ctn.addClass('page-ctn');
    this.ctn.html`
      <div class="side-bar"></div>
      <div class="main-board">
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
