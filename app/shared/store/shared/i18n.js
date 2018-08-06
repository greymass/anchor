/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

import i18n from 'i18next';
import Backend from 'i18next-sync-fs-backend';
import sprintf from 'i18next-sprintf-postprocessor';
import LanguageDetector from 'i18next-electron-language-detector';
import { reactI18nextModule } from 'react-i18next';

const path = require('path');

const configureLocalization = (resourcePath, store) => {
  let lang = false;
  if (store.settings) {
    lang = store.settings.lang;
  }
  // localization provider
  i18n.use(Backend);
  if (!lang) {
    i18n.use(LanguageDetector);
  }
  i18n
    .use(reactI18nextModule)
    .use(sprintf)
    .init({
      lng: lang,
      fallbackLng: 'en-US',
      ns: ['common'],
      defaultNS: 'common',
      fallbackNS: 'common',
      debug: (process.env.DEBUG_PROD === 'true'),
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: path.join(resourcePath, 'renderer/assets/locales/{{lng}}/{{ns}}.json'),
        jsonIndent: 2
      },
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      react: {
        wait: true,
        withRef: true
      }
    });
  global.i18n = i18n;
};

export default { configureLocalization };
