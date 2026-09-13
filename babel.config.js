module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
