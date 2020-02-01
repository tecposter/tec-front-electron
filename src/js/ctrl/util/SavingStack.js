const DELAY = 777;

export default class SavingStack {
  constructor() {
    this.stack = {};
    this.isPreparing = false;

    this.callback = () => {};
  }

  prepare(postID, content) {
    this.stack[postID] = { postID, content };
    this.preparing();
  }

  preparing() {
    if (!this.isPreparing) {
      this.isPreparing = true;
      setTimeout(() => this.saving(), DELAY);
    }
  }

  onSaving(fun) {
    this.callback = fun;
  }

  saving() {
    const items = this.getItems();
    if (items.length > 0) {
      this.stack = {};
      this.callback(items);
    }
  }

  saved() {
    this.isPreparing = false;
    const items = this.getItems();
    if (items.length > 0) {
      this.preparing();
    }
  }

  getItems() {
    return Object.values(this.stack);
  }
}
