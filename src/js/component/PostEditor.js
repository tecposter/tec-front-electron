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
  }

  view(post) {
    this.setPost(post);
    this.markdown.setContent(post.content);
    this.markdown.viewMode();
  }

  preview(post) {
    this.setPost(post);
    if (post.draft) {
      this.markdown.setContent(post.draft);
    } else {
      this.markdown.setContent(post.content);
    }
    this.markdown.previewMode();
  }

  appendTo(node) {
    super.appendTo(node);
    this.markdown.adjustLayout();
  }
}
