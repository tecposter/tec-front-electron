import GapEvent from './gap/GapEvent';

export default class PageCtn {
  constructor(ctn) {
    this.ctn = ctn;
    this.ctn.addClass('page-ctn');
    this.ctn.html`
      <div class="side-bar column">
        <div class="operation">
          <div class="new-post">
            <button class="btn round primary-tint"> + </button>
            <a href="javascript:;">New Post</a>
          </div>
        </div>
        <div class="side-panel">
        </div>
      </div>
      <div class="main-board column">
        <div class="main-panel"></div>
      </div>
    `;
    this.event = new GapEvent();

    this.sideBar = this.ctn.oneElem('.side-bar');
    this.sidePanel = this.sideBar.oneElem('.side-panel');

    this.mainBoard = this.ctn.oneElem('.main-board');
    this.mainPanel = this.mainBoard.oneElem('.main-panel');
    /*
    this.editPanel = this.mainBoard.oneElem('.edit-panel');
    this.viewPanel = this.mainBoard.oneElem('.view-panel');
    */

    this.sideBar.oneElem('.new-post button').on('click', (evt) => this.triggerNewPost(evt));
    this.sideBar.oneElem('.new-post a').on('click', (evt) => this.triggerNewPost(evt));
  }

  triggerNewPost(evt) {
    this.event.trigger('new-post', evt);
  }

  onNewPost(fun) {
    this.event.on('new-post', fun);
  }

  getMainBoard() {
    return this.mainBoard;
  }

  getSidePanel() {
    return this.sidePanel;
  }

  getMainPanel() {
    return this.mainPanel;
  }
  /*
  getEditPanel() {
    return this.editPanel;
  }

  getViewPanel() {
    return this.viewPanel;
  }

  edit() {
    this.viewPanel.hide();
    this.editPanel.show();
  }

  view() {
    this.editPanel.hide();
    this.viewPanel.show();
  }
  */
}
