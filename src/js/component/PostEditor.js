import { Component } from './base';

export default class PostEditor extends Component {
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
    this.isEditing = false;
  }

  setPost(post) {
    this.post = post;
  }

  getPost() {
    return this.post;
  }

  view(post) {
    this.isEditing = false; // must add at the front
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
    this.isEditing = true; // must add at the bottom
  }

  appendTo(node) {
    super.appendTo(node);
    this.markdown.adjustLayout();
  }

  onChange(fun) {
    this.markdown.onChange((...args) => {
      if (this.isEditing) {
        fun(...args);
      }
    });
  }

  getContent() {
    return this.markdown.getContent();
  }
}
