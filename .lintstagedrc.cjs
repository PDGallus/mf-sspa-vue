module.exports = {
  '*.{ts,vue}': ['npm run format:eslint', 'prettier --write'],
  '*.css': ['prettier --write'],
};
