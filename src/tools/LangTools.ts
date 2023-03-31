export const Lang = (() => {
  let $labels: { [key: string]: string } = {};

  return {
    async setLang(lang: string = 'az') {
      switch (lang) {
        case 'az':
          // eslint-disable-next-line global-require
          $labels = require('../core/Langs').Labels;
          break;
        case 'en':
          // eslint-disable-next-line global-require
          $labels = require('../core/Langs.en').Labels;
          break;
        case 'ru':
          // eslint-disable-next-line global-require
          $labels = require('../core/Langs.ru').Labels;
          break;
        default:
          // eslint-disable-next-line global-require
          $labels = require('../core/Langs').Labels;
          break;
      }
    },

    getLang(key: string): string {
      return $labels[key] || key;
    }
  };
})();
