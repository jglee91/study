export const pathParser = path => {
  let splitPathType = {};
  const result = new RegExp('{(.*?)}/(.*)', 'g').exec(path);

  if (result) {
    // {contents}/bizMOB/sign.bmp
    // result[1]: {contents}
    // result[2]: bizMOB/sign.bmp
    splitPathType.type = result[1] ? result[1] : 'absolute';
    splitPathType.path = result[2];
  } else {
    splitPathType.type = 'absolute';
    splitPathType.path = path;
  }

  return splitPathType;
};
