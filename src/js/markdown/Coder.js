import { Component } from './gap';
/*
Monaco editor dynamically resizable:
https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable
*/

export default class Coder extends Component {
  constructor(monaco, content) {
    super('div', 'coder');

    this.monaco = monaco;
    this.content = content;

    this.inner = this.monaco.editor.create(this.ctn, {
      value: this.content,
      language: 'markdown',
      wordWrap: 'wordWrapColumn',
      wordWrapColumn: 84,
      wordWrapMinified: true,
      automaticLayout: true,
      wrappingIndent: 'same',
    });
  }

  onChange(callback) {
    this.inner.onDidChangeModelContent(callback);
  }

  onScroll(callback) {
    this.inner.onDidScrollChange(callback);
  }

  getContent() {
    return this.inner.getValue();
  }

  setContent(content) {
    this.inner.setValue(content);
  }

  getLineCount() {
    return this.inner.getModel().getLineCount();
  }

  getVisibleRange() {
    return this.inner.getVisibleRanges()[0];
  }
}
