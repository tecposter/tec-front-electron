import { Component } from './base';

export default class CommitViewer extends Component {
  constructor(parser) {
    super('div', 'commit-viewer');
    this.ctn.html`
    <div class="small">
      contentID: <span class="content-id"></span>
    </div>
    <div class="content"></div>
    `;

    this.parser = parser;
    this.contentIDElem = this.ctn.oneElem('.content-id');
    this.contentElem = this.ctn.oneElem('.content');
  }

  setContent(id, content) {
    this.contentIDElem.innerHTML = id;
    this.contentElem.innerHTML = this.parser.toHTML(content);
  }
}
