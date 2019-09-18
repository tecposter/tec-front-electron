const DefaultContent = '# TecPoster Markdown Editor';

/*
Monaco editor dynamically resizable:
https://stackoverflow.com/questions/47017753/monaco-editor-dynamically-resizable
*/

export default class Coder {
  constructor(monaco, ctnElem, content) {
    this.monaco = monaco;
    this.ctnElem = ctnElem;
    this.content = content || DefaultContent;

    this.inner = this.monaco.editor.create(this.ctnElem, {
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

  getContent() {
    return this.inner.getValue();
  }
}
