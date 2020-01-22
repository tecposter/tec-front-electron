import { createElem } from '../gap/web';

export default class Base {
  constructor(tagName, classNames) {
    this.ctn = createElem(tagName);
    this.ctn.addClass(classNames);
  }

  appendTo(node) {
    if (node instanceof Node) {
      node.appendChild(this.ctn);
    }
  }
}
