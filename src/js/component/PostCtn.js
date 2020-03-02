import { MultiCol } from './base';
import getCommittedTime from './util/getCommittedTime';

export default class PostCtn extends MultiCol {
  constructor() {
    super({
      resizeColCount: 1,
      flexColCount: 1,
      extraClass: 'post-ctn',
      minColWidth: 245,
    });

    this.side = this.getCol(0);
    this.main = this.getCol(1);

    this.showSideBtn = this.main.oneElem('.show-side');
    this.hideSideBtn = this.main.oneElem('.hide-side');

    this.showSideBtn.on('click', () => this.showSide());
    this.hideSideBtn.on('click', () => this.hideSide());

    this.hideSide();
  }

  view(post) {
    this.setPost(post);
    this.hideSide();
  }

  preview(post) {
    this.setPost(post);
    this.hideSide();
  }

  setPost(post) {
    this.ctn.allElem('.post-id').forEach((elem) => elem.html`${post.id}`);
    this.ctn.allElem('.commit-id').forEach((elem) => elem.html`${post.commitID}`);
    this.ctn.allElem('.committed').forEach((elem) => elem.html`${getCommittedTime(post)}`);
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
    const sideBar = this.getCol(0);
    sideBar.addClass('side-bar');
    sideBar.html`
    <div class="head primary-tint">
      postID:
      <span class="post-id">
      </span>
    </div>
    <div class="body">
    </div>
    `;

    this.getCol(1).html`
    <div class="head">
      <a class="show-side toggle">
        postID:<span class="post-id"></span>
        &gt;&gt;
      </a>
      <a class="hide-side toggle">
        &lt;&lt;
      </a>

      commitID:<span class="commit-id"></span>

      <span class="committed elapsed"></span>
    </div>
    <div class="body">
    </div>
    `;
  }
}
