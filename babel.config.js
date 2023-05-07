module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs'],
    },
  },
};
