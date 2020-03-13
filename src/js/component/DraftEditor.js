import { Component } from './base';

export default class DraftEditor extends Component {
  constructor(markdown) {
    super('div', 'draft-editor');

    this.markdown = markdown;
    this.markdown.appendTo(this.ctn);
  }

  setContent(content) {
    this.markdown.setContent(content);
    this.markdown.previewMode();
  }
}
