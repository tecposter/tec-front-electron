import Base from './Base';

export default class SearchBar extends Base {
  constructor() {
    super('div', 'search-bar');

    this.ctn.html`
    <input type="search" value="" >
    `;
  }
}
