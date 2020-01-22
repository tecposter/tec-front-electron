import Base from './Base';
import GapEvent from '../gap/GapEvent';

const EVENT = {
  SELECT: 'select',
};

let preSelected;

export default class PostList extends Base {
  constructor() {
    super('div', 'post-list background-tint');

    this.event = new GapEvent();
    this.posts = {};

    this.ctn.on('click', (evt) => this.selectPost(evt));
  }

  onSelect(fun) {
    this.event.on(EVENT.SELECT, fun);
  }

  selectPost(evt) {
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

    if (preSelected) {
      preSelected.removeClass('selected');
    }
    target.addClass('selected');
    preSelected = target;
  }

  load(postArr) {
    if (!postArr || !Array.isArray(postArr)) {
      return;
    }

    this.posts = {};
    this.ctn.html`${postArr.map((post) => {
      this.posts[post.id] = post;
      return `
      <div class="post-item">
        <a href="javascript:;" data-id="${post.id}">
          ${post.title || 'untitiled'}
        </a>
      </div>
      `;
    })}`;
  }
}
