const toMathHtml = (katex, str) => {
  try {
    return katex.renderToString(str);
  } catch (e) {
    if (e instanceof katex.ParseError) {
      return (`Error in LaTeX '${str}': ${e.message}`)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    return 'Error Unkown';
  }
};

export default class Parser {
  constructor(hljs, katex, markdownit) {
    const mdit = markdownit({
      highlight: (str, inLang) => {
        const lang = inLang.toLowerCase().trim();

        if (lang === 'math') {
          return `<pre><code>${toMathHtml(katex, str)}</code></pre>`;
        }

        if (lang && hljs.getLanguage(lang)) {
          return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
        }

        return `<pre class="hljs"><code>${mdit.utils.escapeHtml(str)}</code></pre>`;
      },
    });

    this.inner = mdit;
    this.katex = katex;
  }

  toHTML(str) {
    const mathInlinePattern = /\\\((.+?)\\\)/g;
    return this.inner.render(str.trim())
      .replace(mathInlinePattern, (match, src) => toMathHtml(this.katex, src));
  }
}
