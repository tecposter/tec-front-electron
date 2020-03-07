import { createElem } from 'gap-front-web';

export default class Component {
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
