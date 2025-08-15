import { navigationData } from './navigationData';

export const getHeaderNavData = (language = 'en') => {
  return navigationData[language].header;
};

export const getFooterNavData = (language = 'en') => {
  return navigationData[language].footer;
};

export const headerNavData = navigationData.en.header;
export const footerNavData = navigationData.en.footer;

