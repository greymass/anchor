/* eslint global-require: off, import/no-extraneous-dependencies: off */

const developmentEnvironments = ['development', 'test'];

const developmentPlugins = [require('@babel/plugin-transform-runtime')];

const productionPlugins = [
  require('babel-plugin-dev-expression'),

  // babel-preset-react-optimize
  require('@babel/plugin-transform-react-constant-elements'),
  require('@babel/plugin-transform-react-inline-elements'),
  require('babel-plugin-transform-react-remove-prop-types'),
];

module.exports = (api) => {
  // See docs about api at https://babeljs.io/docs/en/config-files#apicache

  const development = api.env(developmentEnvironments);

  return {
    assumptions: {
      setPublicClassFields: true
    },
    presets: [
      // @babel/preset-env will automatically target our browserslist targets
      require('@babel/preset-env', {
        modules: 'commonjs',
        debug: true
      }),
      require('@babel/preset-typescript'),
      [require('@babel/preset-react'), { development }],
      require('@babel/preset-flow')
    ],
    plugins: [
      require('babel-plugin-add-module-exports'),
      require('@babel/plugin-transform-modules-commonjs'),
      require('@babel/plugin-proposal-function-bind'),
      ...(development ? developmentPlugins : productionPlugins),
    ],
  };
};
