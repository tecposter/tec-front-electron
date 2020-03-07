import { oneElem, createElem } from '../../gap';

const eachProp = (obj, fun) => {
  Object.keys(obj).forEach((key) => {
    if ({}.hasOwnProperty.call(obj, key)) {
      fun(key, obj[key]);
    }
  });
};

const toArgs = (arg) => {
  if (typeof arg === 'string') {
    return [arg];
  }

  if (Array.isArray(arg)) {
    return arg;
  }

  throw new Error('The format of #1 parameter of markdown.fun.toArgs is unkown');
};

const createScriptElem = (src, attrs = {}) => {
  if (typeof (src) !== 'string') {
    throw new Error('must be string');
  }
  const elem = createElem('script');
  elem.type = 'text/javascript';
  elem.src = src;

  eachProp(attrs, (name, val) => elem.setAttribute(name, val));

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

const loadCss = (href, attrs = {}) => {
  const link = createElem('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.media = 'screen,print';
  link.href = href;
  eachProp(attrs, (name, val) => link.setAttribute(name, val));
  oneElem('head').appendChild(link);
};

const asLoadRes = async (res) => {
  (res.csses || []).forEach((css) => loadCss(...toArgs(css)));
  // (res.jses || []).forEach(js => await asLoadJs(...toArgs(js)));

  // eslint-disable-next-line no-restricted-syntax
  for (const js of (res.jses || [])) {
    // eslint-disable-next-line no-await-in-loop
    await asLoadJs(...toArgs(js));
  }
  // await Promise.all((res.jses || []).map((js) => asLoadJs(...toArgs(js))));
};

export { asLoadJs, loadCss, asLoadRes };
