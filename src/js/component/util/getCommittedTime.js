import { parseElapsed } from '../../util';

const getCommittedTime = (post) => {
  if (post.committed) {
    return parseElapsed(Math.floor(post.committed / 1000000));
  }

  return '';
};

export default getCommittedTime;
