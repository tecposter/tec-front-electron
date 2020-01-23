import Base from './Base';

export default class PostEditor extends Base {
  constructor(markdown) {
    super('div', 'post-editor');

    this.ctn.html`
    <div class="editor">
    </div>
    `;

    this.editorElem = this.ctn.oneElem('.editor');

    this.markdown = markdown;
    this.markdown.appendTo(this.editorElem);
    this.markdown.viewMode();
  }

  setPost(post) {
    this.post = post;
    this.markdown.setContent(post.content);
  }

  view(post) {
    this.setPost(post);
    this.markdown.viewMode();
  }

  preview(post) {
    this.setPost(post);
    this.markdown.previewMode();
  }

  appendTo(node) {
    super.appendTo(node);
    this.markdown.adjustLayout();
  }
}
