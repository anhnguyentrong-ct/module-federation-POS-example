/* This config is used for both server-side and client-side */
/* eslint-disable import/no-commonjs */

// available at server-side and during dev, once built, isDev always false
const isDev = process.env.NODE_ENV === 'development';
// only available in container env, if not, assume local
const commitHash = process.env.COMMIT_HASH || '';
/**
 * These environment vars will be available for both server and client.
 * Add more if needed
 *
 * @example
 * import { universalEnv } from '~config';
 * console.log(universalEnv.VERSION);
 *
 * @type {{
 *   BASE_DOMAIN?: string,
 *   ENV?: string,
 *   GTM_CONTAINER?: string,
 *   ASSET_DOMAIN?: string,
 *   VERSION?: string,
 * }}
 */
const universalEnv = Object.fromEntries([
  getUniversalEnv('BASE_DOMAIN', 'com'),
  getUniversalEnv('ENV', 'prod'),
  getUniversalEnv('GTM_CONTAINER', 'GTM-NZKHXF7'),
  getUniversalEnv('ASSET_DOMAIN', ''),
  getUniversalEnv('VERSION', '', 'npm_package_version'), // i.e: server side's process.env.npm_package_version
]);

const baseDomain = universalEnv.BASE_DOMAIN;
const env = universalEnv.ENV;

const legacyEnvMap = {
  dev: 'development',
  uat: 'uat',
  prod: 'production',
};

const legacyEnv = !isDev ? legacyEnvMap[env] : 'development';

// const pkgVersion = universalEnv.VERSION;
const assetDomain = universalEnv.ASSET_DOMAIN;
const assetPrefix = !isDev && assetDomain && commitHash ? `${assetDomain}/${commitHash}` : '';

const appWrapperBasedUrl = 'https://static.chotot.com/storage/APP_WRAPPER';
// local test, enable if needed:
// const appWrapperBaseUrl = 'http://localhost:3000/app-wrapper';
const getAppWrapperBasedUrl = (buildVersion) =>
  `${appWrapperBasedUrl}/${legacyEnv}${buildVersion ? `/${buildVersion}/desktop` : ''}`;

module.exports = {
  universalEnv,
  baseDomain,
  assetPrefix,
  env, // dev, uat, prod
  legacyEnv, // development, uat, production
  cookieConfig: {
    path: '/',
    domain: env === 'development' ? 'localhost' : `.chotot.${baseDomain}`,
    expires: 365,
  },
  cookieDomain: env === 'development' ? 'localhost' : `.chotot.${baseDomain}`,
  appWrapper: {
    getBasedUrl: getAppWrapperBasedUrl,
    header: 'header.js',
    headercss: 'header.css',
    footer: 'footer.js',
    savesearchbutton: 'savesearchbutton.js',
    placeholder: 'placeholder.js',
    target: 'v3',
    defaultVersion: '3.0.6',
  },
  baseUrl: `https://www.chotot.${baseDomain}`,
  vehBaseUrl: `https://xe.chotot.${baseDomain}`,
  propBaseUrl: `https://nha.chotot.${baseDomain}`,
  iconUrl: 'https://static.chotot.com/storage/icons/logos/ad-param/',
  gatewayUrl: `https://gateway.chotot.${baseDomain}`,
  gtmContainerId: universalEnv.GTM_CONTAINER,
  publicProfileUrl: `https://www.chotot.${baseDomain}/user`,
  dashboardUrl: `https://www.chotot.${baseDomain}/dashboard`,
  shopUrl: {
    vehicle: `https://xe.chotot.${baseDomain}/cua-hang`,
    property: `https://nha.chotot.${baseDomain}/chuyen-trang`,
    electronic: `https://www.chotot.${baseDomain}/cua-hang-dien-tu`,
  },
  accountBaseUrl: `https://id.chotot.${baseDomain}`,
  chatBaseUrl: `https://chat.chotot.${baseDomain}`,
  cloudGatewayUrl: `https://gateway.chotot.${baseDomain}`,
  errorImgUrl: 'https://static.chotot.com/storage/empty_state/desktop/',
  onPromptAlert: true,
  distanceGalleryAd: 20,
  distanceGalleryAdLoadMore: 20,
  adBannerEnable: true,
  topAdDesktopBannerEnable: true,
  topMobileAdBanner: true,
  enableAdSense: true,
  enableNativeAdBanner: true,
  midAdMobileBanner: true,
  adBannerAdViewDesktop: true,
  adBannerAdViewMobile: true,
  lang: 'vi',
  app: {
    title: 'Chợ Tốt - Đăng tin',
    head: {
      meta: [
        {
          key: 'meta_charSet',
          charSet: 'utf-8',
        },
        {
          key: 'meta_name',
          name: 'name',
          content: 'Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt',
        },
        {
          key: 'meta_description',
          name: 'description',
          content:
            'Chợ Tốt - Website mua bán rao vặt của người Việt với hàng ngàn món hời đang được rao bán mỗi ngày. Đăng tin mua bán UY TÍN, NHANH CHÓNG, AN TOÀN.',
        },
        {
          key: 'meta_image',
          property: 'image',
          content: 'https://static.chotot.com.vn/storage/marketplace/ct_orange_c2c_200.jpg',
        },
        {
          key: 'meta_fb_admins',
          property: 'fb:admins',
          content: '100003537963527',
        },
        {
          key: 'meta_fb_app_id',
          property: 'fb:app_id',
          content: '221564734660253',
        },
        {
          key: 'meta_og_title',
          property: 'og:title',
          content: 'Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt',
        },
        {
          key: 'meta_og_image',
          property: 'og:image',
          content: 'https://static.chotot.com.vn/storage/marketplace/ct_orange_c2c_200.jpg',
        },
        {
          key: 'meta_og_description',
          property: 'og:description',
          content:
            'Chợ Tốt - Website mua bán rao vặt của người Việt với hàng ngàn món hời đang được rao bán mỗi ngày. Đăng tin mua bán UY TÍN, NHANH CHÓNG, AN TOÀN.',
        },
        {
          key: 'meta_og_url',
          property: 'og:url',
          content: 'https://www.chotot.com',
        },
        {
          key: 'meta_og_type',
          property: 'og:type',
          content: 'website',
        },
        {
          key: 'meta_viewport',
          name: 'viewport',
          content:
            'width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0',
        },
        {
          key: 'meta_mobile_web_app_capable',
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
        {
          key: 'meta_apple_mobile_web_app_capable',
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          key: 'meta_application_name',
          name: 'application-name',
          content: 'Chotot',
        },
        {
          key: 'meta_apple_mobile_web_app_status_bar_style',
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black',
        },
        {
          key: 'meta_apple_mobile_web_app_title',
          name: 'apple-mobile-web-app-title',
          content: 'Chotot.com',
        },
        {
          key: 'meta_theme_color',
          name: 'theme-color',
          content: '#FDCE09',
        },
      ],
    },
  },
  chototId: {
    endpoint: `https://id.chotot.${baseDomain}/api`,
    clientId: 'ct_web_client',
    callback: `https://www.chotot.${baseDomain}`,
  },
};

/**
 * @param {string} key The universal key used to access `process.env[key]` or `window[key]`
 * @param {any} [defaultValue] fallback value
 * @param {string} [processEnvKey] server side process.env[key] if we want to use different client env name
 * @return {[string, any]}
 */
function getUniversalEnv(key, defaultValue = '', processEnvKey = '') {
  if (processEnvKey != null && process?.env[processEnvKey] != null) {
    // server side key different from client side global env
    return [key, process.env[processEnvKey]];
  } else if (process?.env[key] != null) {
    // server side
    return [key, process.env[key]];
  }
  if (typeof window !== 'undefined' && window[key] != null) {
    // client side
    return [key, window[key]];
  }
  // fallback
  return [key, defaultValue];
}
