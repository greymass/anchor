module.exports = {
  app: {
    getName: () => 'Anchor Wallet',
    getPath: () => '',
    getVersion: () => '1.4.0-beta.1'
  },
  getCurrentWindow: () => ({
    close: () => undefined,
    id: 1
  }),
  getGlobal: () => undefined
};
