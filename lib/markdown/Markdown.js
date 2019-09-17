import { GapEvent } from 'gap/GapEvent';

const DefaultContent = '# Title\n';

export default class Markdown {
  constructor(monaco, mdit, ctnElem, content) {
    this.monaco = monaco;
    this.mdit = mdit;
    this.ctnElem = ctnElem;
    this.content = content || DefaultContent;
    this.event = new GapEvent();
  }
}
