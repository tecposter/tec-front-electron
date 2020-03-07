import { Component } from './base';

export default class SearchBar extends Component {
  constructor() {
    super('div', 'search-bar');

    this.ctn.html`
    <input type="search" value="" >
    `;
  }
}
