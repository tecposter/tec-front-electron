import Base from './Base';
import GapEvent from '../gap/GapEvent';
import { createElem } from '../gap/web';

const EVENT = {
  SELECT: 'select',
};

const SELECT_TYPE = {
  VIEW: 'view',
  PREVIEW: 'preview',
  EDIT: 'edit',
};

const createPostInnerHTML = (post) => `
  <a href="javascript:;" data-id="${post.id}">
    ${post.title || 'untitiled'}
  </a>
`;

let selected;

export default class PostList extends Base {
  constructor() {
    super('div', 'post-list background-tint');

    this.event = new GapEvent();
    this.posts = {};

    this.ctn.on('click', (evt) => this.handleClick(evt));
  }

  onSelect(fun) {
    this.event.on(EVENT.SELECT, fun);
  }

  handleClick(evt) {
    const { target } = evt;
    if (target.tagName.toLowerCase() !== 'a') {
      return;
    }
    const id = target.getAttribute('data-id');
    const post = this.posts[id];
    if (!post) {
      throw new Error(`cannot find post id ${id}`);
    }
    this.event.trigger(EVENT.SELECT, post);
  }

  select(post) {
    const { id } = post;
    const target = this.ctn.oneElem(`#post-${id}`);
    if (!target) {
      return;
    }
    if (selected) {
      selected.removeClass('selected');
    }
    target.addClass('selected');
    selected = target;
  }

  load(postArr) {
    if (!postArr || !Array.isArray(postArr)) {
      return;
    }

    this.posts = {};
    this.ctn.html`${postArr.map((post) => {
      this.posts[post.id] = post;
      return `
      <div class="post-item" id="post-${post.id}">
        ${createPostInnerHTML(post)}
      </div>
      `;
    })}`;
  }

  add(post) {
    const postElem = createElem('div');
    postElem.id = `post-${post.id}`;
    postElem.addClass('post-item');
    postElem.innerHTML = createPostInnerHTML(post);
    this.ctn.prepend(postElem);
    this.select(post);
    this.posts[post.id] = post;
    // this.selectPostByElem(postElem, SELECT_TYPE.PREVIEW);
  }
}