import { asLoadRes } from 'asset-loader';
import asSingle from 'as-single';

const KatexRes = {
  csses: [
    [
      '/katex/katex.min.css',
      {
        integrity: 'sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG',
        crossorigin: 'anonymous',
      },
    ],
  ],
  jses: [
    [
      '/katex/katex.min.js',
      {
        integrity: 'sha384-JiKN5O8x9Hhs/UE5cT5AAJqieYlOZbGT3CHws/y97o3ty4R7/O5poG9F3JoiOYw1',
        crossorigin: 'anonymous',
      },
    ],
  ],
};

export default async () => asSingle('katex', async () => {
  await asLoadRes(KatexRes);
  return window.katex;
});
