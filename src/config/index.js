const config = {
  ws: {
    addr: 'ws://192.168.56.7:7890/ws',
  },
  markdown: {
    hljsRes: {
      csses: ['/hljs/styles/default.css'],
      jses: [
        '/hljs/highlight.pack.js',
      ],
    },
    katexRes: {
      csses: ['/katex/katex.min.css'],
      jses: ['/katex/katex.min.js'],
    },
    markdownitRes: {
      jses: ['/mdit/markdown-it.min.js'],
    },
    monacoRes: {
      path: '/monaco/min/vs',
      csses: [
        [
          '/monaco/min/vs/editor/editor.main.css',
          { 'data-name': 'vs/editor/editor.main' },
        ],
      ],
      jses: [
        '/monaco/min/vs/loader.js',
        '/monaco/min/vs/editor/editor.main.nls.js',
        '/monaco/min/vs/editor/editor.main.js',
      ],
    },
  },
};

export default config;
