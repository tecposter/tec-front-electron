import { GapEvent } from 'gap/GapEvent';

const DefaultContent = '# Title\n';

export default class Markdown {
  constructor(monaco, mdit, hljs, ctnElem, content) {
    this.ctnElem = ctnElem;
    this.content = content || DefaultContent;
    this.event = new GapEvent();
  }
}
