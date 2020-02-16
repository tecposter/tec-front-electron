import { createElem } from '../gap/web';
import Base from './Base';

const minColWidth = 100;

let currentCol = null;
let currentCtn = null;
let prevX = null;

const regMultiCol = (ctn) => {
  ctn.allElem('.resize').forEach((col) => {
    const dragElem = createElem('div');
    dragElem.addClass('drag');
    dragElem.draggable = true;
    col.appendChild(dragElem);
  });
};

const validColWidth = (ctn) => {
  const len = ctn.children.length;
  for (let i = 0; i < len; i += 1) {
    const col = ctn.children[i];
    if (col.offsetWidth <= minColWidth) {
      return false;
    }
  }
  return true;
};

document.addEventListener('dragstart', (evt) => {
  const drag = evt.target;
  if (!drag.classList.contains('drag')) {
    return;
  }

  currentCol = drag.parentElement;
  currentCtn = currentCol.parentElement;
}, false);

document.addEventListener('dragend', () => {
  currentCol = null;
  currentCtn = null;
  prevX = null;
}, false);

document.addEventListener('dragover', (evt) => {
  prevX = prevX || evt.clientX;
  if (!currentCol || !currentCtn) {
    return;
  }

  const diff = evt.clientX - prevX;
  const width = currentCol.offsetWidth + diff;
  currentCol.style.width = `${width}px`;

  if (!validColWidth(currentCtn)) {
    currentCol.style.width = `${width - diff}px`;
    return;
  }

  prevX = evt.clientX;
  evt.preventDefault();
}, false);

export default class MultiCol extends Base {
  constructor(resizeColCount = 1, flexColCount = 1) {
    super('div', 'multi-col');
    const resizeCols = [];
    const flexCols = [];

    for (let i = 0; i < resizeColCount; i += 1) {
      resizeCols.push('<div class="col resize"></div>');
    }

    for (let i = 0; i < flexColCount; i += 1) {
      flexCols.push('<div class="col"></div>');
    }

    this.ctn.html`${resizeCols}${flexCols}`;

    regMultiCol(this.ctn);
  }

  getCol(index) {
    return this.ctn.children[index];
  }
}
// document.querySelectorAll('.multi-col').forEach(ctn => regMultiCol(ctn));
