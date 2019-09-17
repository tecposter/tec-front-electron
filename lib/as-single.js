import { GapEvent } from 'gap/GapEvent';

const container = {};
const pending = {};
const event = new GapEvent();

const asPend = (key) => new Promise((resolve) => {
  event.on(key, () => resolve(true));
});

const mustItem = (key) => {
  if (container[key]) {
    // console.log('asSingle:', key, 'end');
    return container[key];
  }

  throw new Error(`cannot get async singleton of "${key}"`);
};

export default async (key, asFun) => {
  // console.log('asSingle:', key, 'start');
  if (container[key]) {
    return mustItem(key);
  }

  if (pending[key]) {
    await asPend(key);
    return mustItem(key);
  }

  // console.log('async singleton', key, asFun);
  pending[key] = true;
  container[key] = await asFun();
  if (event.hasEvent(key)) {
    event.trigger(key);
  }
  return mustItem(key);
};
