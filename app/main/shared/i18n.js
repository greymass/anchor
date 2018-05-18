/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

import i18n from 'i18next';
import Backend from 'i18next-sync-fs-backend';
import sprintf from 'i18next-sprintf-postprocessor';
import LanguageDetector from 'i18next-electron-language-detector';
import { reactI18nextModule } from 'react-i18next';

const path = require('path');

const configureLocalization = (resourcePath) => {
  // localization provider
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .use(sprintf)
    .init({
      fallbackLng: 'en',
      ns: ['common'],
      defaultNS: 'common',
      fallbackNS: 'common',
      debug: (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'),
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: path.join(resourcePath, 'renderer/assets/locales/{{lng}}/{{ns}}.json'),
        jsonIndent: 2
      },
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      react: {
        wait: true
      }
    });
  global.i18n = i18n;
};

export default { configureLocalization };
