const assertCMD = (cmd) => {
  if (!cmd) {
    throw new Error('Incorrect CMD Format');
  }
};

export default assertCMD;
