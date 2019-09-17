import { oneElem, createElem } from 'gap/web';

const createScriptElem = (src, attrs = {}) => {
  if (typeof (src) !== 'string') {
    throw new Error('must be string');
  }
  const elem = createElem('script');
  elem.type = 'text/javascript';
  elem.src = src;

  Object.keys(attrs).forEach((attrName) => {
    if (Object.prototype.hasOwnProperty.call(attrs, attrName)) {
      elem.setAttribute(attrName, attrs[attrName]);
    }
  });

  return elem;
};

const asLoadJs = (src, attrs = {}) => new Promise((resolve) => {
  const head = oneElem('head');
  const scriptElem = (src instanceof HTMLScriptElement) ? src : createScriptElem(src, attrs);
  head.appendChild(scriptElem);
  if (scriptElem.src) {
    scriptElem.on('load', () => {
      // console.log('asLoadJs: ', src, 'end');
      resolve(true);
    });
  } else {
    // console.log('asLoadJs: ', src, 'end');
    resolve(true);
  }
});

export default asLoadJs;
