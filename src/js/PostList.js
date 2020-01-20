import GapEvent from './gap/GapEvent';


let preSelected = null;

export default class PostList {
  constructor(ctn, posts) {
    this.ctn = ctn;
    this.ctn.addClass('post-list backgroud-tint');
    this.load(posts);
    this.ctn.on('click', (evt) => this.selectPost(evt));
    this.event = new GapEvent();
  }

  onSelect(fun) {
    this.event.on('select', fun);
  }

  selectPost(evt) {
    const { target } = evt;
    if (target.tagName.toLowerCase() !== 'a') {
      return;
    }

    const id = target.getAttribute('data-id');
    if (preSelected) {
      preSelected.removeClass('selected');
    }
    target.addClass('selected');
    preSelected = target;
    // console.log(id);
    this.event.trigger('select', id);
  }

  load(posts) {
    this.ctn.html`${posts.map((post) => `
      <div class="post-item">
        <a href="#/post/${post.id}" data-id="${post.id}">
          ${post.title}
        </a>
      </div>
    `)}`;
  }
}
