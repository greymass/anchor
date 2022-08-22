const remote = require('@electron/remote');

console.log(remote);
const i18n = remote.getGlobal('i18n');
export default i18n;
