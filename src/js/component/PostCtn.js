import { MultiCol } from './base';
import CommitViewer from './CommitViewer';
import DraftEditor from './DraftEditor';
import getCommittedTime from './util/getCommittedTime';

export default class PostCtn extends MultiCol {
  constructor(markdown) {
    super({
      resizeColCount: 1,
      flexColCount: 1,
      extraClass: 'post-ctn',
      minColWidth: 245,
    });

    this.side = this.getCol(0);
    this.main = this.getCol(1);
    this.main.addClass('main');

    this.body = this.main.oneElem('.body');

    this.showSideBtn = this.main.oneElem('.show-side');
    this.hideSideBtn = this.main.oneElem('.hide-side');

    this.showSideBtn.on('click', () => this.showSide());
    this.hideSideBtn.on('click', () => this.hideSide());
    this.hideSide();

    this.markdown = markdown;
    this.commitViewer = new CommitViewer(this.markdown.createParser());
    this.commitViewer.appendTo(this.body);
    this.commitViewer.hide();

    this.draftEditor = new DraftEditor(this.markdown.createEditor());
    this.draftEditor.appendTo(this.body);
    this.draftEditor.hide();
  }

  view(post) {
    this.setPost(post);
    this.hideSide();
    this.commitViewer.setContent(post.contentID, post.content);
    this.commitViewer.show();
    this.draftEditor.hide();
  }

  preview(post) {
    this.setPost(post);
    this.hideSide();
    this.draftEditor.setContent(post.draft || post.content);
    this.draftEditor.show();
    this.commitViewer.hide();
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
      <span class="post-id small">
      </span>
    </div>
    <div class="body">
    </div>
    `;

    this.getCol(1).html`
    <div class="head">
      <a class="show-side toggle">
        postID:<span class="post-id small"></span>
        &gt;&gt;
      </a>
      <a class="hide-side toggle">
        &lt;&lt;
      </a>

      commitID:<span class="commit-id small"></span>

      <span class="committed elapsed"></span>
    </div>
    <div class="body">
    </div>
    `;
  }
}
