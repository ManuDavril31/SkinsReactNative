export const isLocalFile = (uri: string): boolean => {
  const isLocal = new RegExp('^/data/user/0/');
  return isLocal.test(uri);
};
