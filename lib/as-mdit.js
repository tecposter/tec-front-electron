import { asLoadRes } from './asset-loader';
import asSingle from './as-single';
import asHLJS from './third/as-hljs';
import asKatex from './third/as-katex';

// https://github.com/markdown-it/markdown-it/

const MarkdownItRes = {
  jses: ['/mdit/markdown-it.min.js'],
};

export default async () => {
  const hljs = await asHLJS();
  const markdownit = await asSingle('mdit', async () => {
    await asLoadRes(MarkdownItRes);
    return window.markdownit;
  });
  const katex = await asKatex();

  const toMathHtml = (str) => {
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

  const mdit = markdownit({
    highlight: (str, inLang) => {
      const lang = inLang.toLowerCase().trim();

      if (lang === 'math') {
        return `<pre><code>${toMathHtml(str)}</code></pre>`;
      }

      if (lang && hljs.getLanguage(lang)) {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
      }

      return `<pre class="hljs"><code>${mdit.utils.escapeHtml(str)}</code></pre>`;
    },
  });
  return mdit;
};

/*
async asCreateMdit() {
        const hljs = await this.asGetHljs();
        await this.asGetKatex();
        const markdownit = await this.asGetMarkdownIt();

        const mdit = markdownit({
            highlight: (str, inLang) => {
                const lang = inLang.toLowerCase().trim();

                if (lang === 'math') {
                    return '<pre><code>' + this.toMathHtml(str) + '</code></pre>';
                } else if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                            hljs.highlight(lang, str, true).value +
                            '</code></pre>';
                    } catch (err) {
                        throw err;
                    }
                }
                return '<pre class="hljs"><code>' + mdit.utils.escapeHtml(str) + '</code></pre>';
            }
        });
        return mdit;
    }
*/
